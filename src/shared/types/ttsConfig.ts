export type TtsVoice = {
    engine: string
    name: string
    lang: string
    gender: string
    priority?: number
    id?: string
}
export type TtsEngineProperty = {
    key: string
    value: string
}

export type TtsConfig = {
    preferredVoices: Array<TtsVoice>
    ttsEngineProperties: Array<TtsEngineProperty>
    xmlFilepath?: string
}
/*
<voice name="abc" lang="en-US" priority="3"/>
<voice name="abc" lang="en-GB" priority="1"/>
<voice name="abc" lang="en-AU" priority="1"/>
...
<voice name="def" lang="es-ES" priority="3"/>
<voice name="def" lang="es-MX" priority="1"/>
<voice name="def" lang="es-AR" priority="1"/>

dialog displays all prio 2+'s

options are prio of 2, 3, 4
derived preferences across langs get prio 1

*/