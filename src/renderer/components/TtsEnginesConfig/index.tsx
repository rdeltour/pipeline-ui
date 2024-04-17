import { useEffect, useState } from 'react'
import { useWindowStore } from 'renderer/store'
import { PipelineAPI } from 'shared/data/apis/pipeline'
import {
    selectTtsVoices,
    setProperties,
    setTtsEngineState,
    setTtsVoices,
} from 'shared/data/slices/pipeline'
import {
    TtsEngineProperty,
    TtsEngineState,
    TtsVoice,
} from 'shared/types/ttsConfig'

const enginePropertyKeys = [
    'org.daisy.pipeline.tts.azure.key',
    'org.daisy.pipeline.tts.azure.region',
    'org.daisy.pipeline.tts.google.apikey',
]
const engineNames = {
    'org.daisy.pipeline.tts.azure': 'Azure',
    'org.daisy.pipeline.tts.google': 'Google',
}

const pipelineAPI = new PipelineAPI(
    (url, ...args) => window.fetch(url, ...args),
    console.info
)

const { App } = window

// Clone operation to ensure the full array is copied and avoid
// having array of references to object we don't want to change
const clone = (propsArray: Array<{ key: string; value: string }>) => [
    ...propsArray.map((kv) => ({ key: kv.key, value: kv.value })),
]

export function TtsEnginesConfigPane({
    ttsEngineProperties,
    onChangeTtsEngineProperties,
}: {
    ttsEngineProperties: Array<TtsEngineProperty>
    onChangeTtsEngineProperties: (props: Array<TtsEngineProperty>) => void
}) {
    const { pipeline } = useWindowStore()
    console.log('TTS engine props', ttsEngineProperties)

    // Clone array and objects in it to avoid updating the oriiginal props
    const [engineProperties, setEngineProperties] = useState<
        Array<{ key: string; value: string }>
    >(clone(ttsEngineProperties))

    const [engineMessage, setEngineMessage] = useState<{
        [engineKey: string]: string
    }>({})

    const [enginePropsChanged, setEnginePropsChanged] = useState<{
        [engineKey: string]: boolean
    }>({})

    useEffect(() => {
        let messages = { ...engineMessage }

        for (let engineKey in pipeline.ttsEnginesStates) {
            // Note : engineKey in template is the full one
            // while in voices only the final name is given
            messages['org.daisy.pipeline.tts.' + engineKey] =
                pipeline.ttsEnginesStates[engineKey].message
        }
        setEngineMessage(messages)
        console.log(messages)
    }, [pipeline.ttsEnginesStates])

    let onPropertyChange = (e, propName) => {
        e.preventDefault()
        let engineProperties_ = clone(engineProperties)
        let prop = engineProperties_.find((prop) => prop.key == propName)
        if (prop) {
            prop.value = e.target.value
        } else {
            let newProp = {
                key: propName,
                value: e.target.value.trim(),
            }
            engineProperties_.push(newProp)
        }
        // Search for updates compared to original props
        let realProp = (ttsEngineProperties || []).find(
            (prop) => prop.key == propName
        )
        const engineKey = propName.split('.').slice(0, 5).join('.')
        setEngineMessage({
            ...engineMessage,
            [engineKey]: null,
        })
        setEnginePropsChanged({
            ...enginePropsChanged,
            [engineKey]:
                realProp == undefined ||
                (realProp && realProp.value != prop.value),
        })
        setEngineProperties([...engineProperties_])
    }

    const isConnectedToTTSEngine = (engineKey: string) => {
        return (
            selectTtsVoices(App.store.getState()).filter(
                (v) => v.engine == engineKey.split('.').slice(-1)[0]
            ).length > 0
        )
    }

    const connectToTTSEngine = (engineKey: string) => {
        const ttsProps = [
            ...engineProperties.filter((k) => k.key.startsWith(engineKey)),
        ]
        // send the properties to the engine for voices reloading
        App.store.dispatch(
            setProperties(
                ttsProps.map((p) => ({ name: p.key, value: p.value }))
            )
        )
        const updatedSettings = [
            ...ttsEngineProperties.filter((k) => !k.key.startsWith(engineKey)),
            ...ttsProps,
        ]
        onChangeTtsEngineProperties(updatedSettings)
    }

    const disconnectFromTTSEngine = (engineKey: string) => {
        const ttsProps = [
            ...engineProperties.filter((k) => k.key.startsWith(engineKey)),
        ]
        // remove properties value on the engine side to disconnect
        // but keep the settings in the app
        App.store.dispatch(
            setProperties(ttsProps.map((p) => ({ name: p.key, value: '' })))
        )
        // TODO : add a setting to let users disable autoconnect on startup
        onChangeTtsEngineProperties(ttsProps)
    }

    return (
        <>
            <p id="available-voices-label" className="label">
                <b>Configure text-to-speech engines</b>
            </p>
            <p className="desc">
                After configuring these engines with the required credentials,
                they will be available under 'Voices'.
            </p>
            <ul>
                {Object.keys(engineNames).map((engineKeyPrefix, idx) => (
                    <li key={engineKeyPrefix + '-' + idx}>
                        {engineNames[engineKeyPrefix]}
                        <ul>
                            {enginePropertyKeys
                                .filter((propkey) =>
                                    propkey.includes(engineKeyPrefix)
                                )
                                .map((propkey, idx) => (
                                    <li key={propkey + '-' + idx}>
                                        <label htmlFor={propkey}>
                                            {(() => {
                                                // the propkey looks like org.daisy.pipeline.tts.enginename.propkeyname
                                                // label the form field as "Propkeyname"
                                                let propkey_ = propkey.replace(
                                                    engineKeyPrefix + '.',
                                                    ''
                                                )
                                                return (
                                                    propkey_
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    propkey_.substring(1)
                                                )
                                            })()}
                                        </label>
                                        <input
                                            id={propkey}
                                            type="text"
                                            onChange={(e) =>
                                                onPropertyChange(e, propkey)
                                            }
                                            value={
                                                engineProperties.find(
                                                    (p) => p.key == propkey
                                                )?.value ?? ''
                                            }
                                        />
                                    </li>
                                ))}
                            {engineMessage[engineKeyPrefix] && (
                                <li className="error">
                                    <span className={engineMessage[engineKeyPrefix]}>
                                        {engineMessage[engineKeyPrefix]}
                                    </span>
                                </li>
                            )}
                            {['azure', 'google'].includes(
                                engineKeyPrefix.split('.').slice(-1)[0]
                            ) && (
                                <li>
                                    {!isConnectedToTTSEngine(engineKeyPrefix) ||
                                    enginePropsChanged[engineKeyPrefix] ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                connectToTTSEngine(
                                                    engineKeyPrefix
                                                )
                                            }}
                                        >
                                            Connect
                                        </button>
                                    ) : isConnectedToTTSEngine(
                                          engineKeyPrefix
                                      ) ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                disconnectFromTTSEngine(
                                                    engineKeyPrefix
                                                )
                                            }}
                                        >
                                            Disconnect
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}
