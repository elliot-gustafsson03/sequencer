import { For, createSignal, onMount } from 'solid-js'
import { Howl } from 'howler'

interface channelType {
    name: string
    audio: Howl
    cells: boolean[]
}

interface ChildComponentRef {
    triggerSeq: (index: number) => void
}

function Sequencer(props: { refSetter: (ref: ChildComponentRef) => void }) {
    const [channels, setChannels] = createSignal<channelType[]>()

    const [currentIndex, setCurrentIndex] = createSignal(-1)

    onMount(() => {
        setChannels([
            {
                name: 'Kick',
                audio: new Howl({
                    src: 'https://drive.google.com/file/d/1oOiHBfnfC9YCwqjPgIgb_gu-Xre48Sy7/view?usp=sharing',
                }),
                cells: Array<boolean>(16).fill(false),
            },
            {
                name: 'Hi-hat',
                audio: new Howl({ src: '/hihat.wav' }),
                cells: Array<boolean>(16).fill(false),
            },
            {
                name: 'Snare',
                audio: new Howl({ src: '/snare.wav' }),
                cells: Array<boolean>(16).fill(false),
            },
        ])

        props.refSetter({ triggerSeq })
    })

    function triggerSeq(index: number) {
        setCurrentIndex(index)

        if (index >= 0) {
            channels()?.forEach((channel) => {
                if (channel.cells[index]) {
                    channel.audio.play()
                }
            })
        }
    }

    function toggleCell(channelIndex: number, cellIndex: number): void {
        setChannels((prev) => {
            let channels = prev!.slice()
            let channel = channels.splice(channelIndex, 1)[0]
            let cells = channel.cells.slice()
            cells[cellIndex] = !cells[cellIndex]

            return [
                ...channels.slice(0, channelIndex),
                { name: channel.name, audio: channel.audio, cells: cells },
                ...channels.slice(channelIndex),
            ]
        })
    }

    function partialToggleCell(channelIndex: number): (index: number) => void {
        return (index: number) => toggleCell(channelIndex, index)
    }

    return (
        <div class="sequencer">
            <For each={channels()}>
                {(channel, index) => {
                    return (
                        <Channel
                            name={channel.name}
                            cells={channel.cells}
                            triggeredCell={currentIndex()}
                            toggleCell={partialToggleCell(index())}
                        />
                    )
                }}
            </For>
        </div>
    )
}

export default Sequencer

function Channel(props: {
    name: string
    cells: boolean[]
    triggeredCell: number
    toggleCell: (index: number) => void
}) {
    return (
        <div class="channel">
            <label>{props.name}:</label>
            <div class="cell-row">
                <For each={props.cells}>
                    {(cell, index) => {
                        return (
                            <Cell
                                active={cell}
                                triggered={props.triggeredCell == index()}
                                toggleCell={() => props.toggleCell(index())}
                            />
                        )
                    }}
                </For>
            </div>
        </div>
    )
}

function Cell(props: {
    active: boolean
    triggered: boolean
    toggleCell: () => void
}) {
    return (
        <div
            class={`cell ${props.active ? 'active' : ''} ${
                props.triggered ? 'triggered' : ''
            }`}
            onClick={() => props.toggleCell()}
        />
    )
}
