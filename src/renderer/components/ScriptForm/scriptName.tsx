import { Script } from 'shared/types'
import { externalLinkClick } from 'renderer/utils/utils'
const { App } = window

export function ScriptName({
    script,
    headerId,
}: {
    script: Script
    headerId: string
}) {
    return (
        <>
            <h1 id={headerId}>
                {script?.nicename}
                {script?.inputs.find((i) =>
                    i.mediaType.includes(
                        'application/vnd.pipeline.tts-config+xml'
                    )
                )
                    ? ' (TTS Enhanced)'
                    : ''}
            </h1>
            <p>
                {script?.description}
                {script?.inputs.find((i) =>
                    i.mediaType.includes(
                        'application/vnd.pipeline.tts-config+xml'
                    )
                )
                    ? '. Text can be recorded in TTS voices.'
                    : ''}
            </p>
            <p>
                {script?.homepage ? (
                    <a
                        href={script.homepage}
                        onClick={(e) => externalLinkClick(e, App)}
                    >
                        Read the script documentation.
                    </a>
                ) : (
                    ''
                )}
            </p>
        </>
    )
}
