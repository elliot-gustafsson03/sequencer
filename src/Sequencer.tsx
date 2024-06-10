import { For, Show, createSignal, onMount } from 'solid-js'

interface channelType {
    name: string
    audio: HTMLAudioElement
    cells: boolean[]
}

function Sequencer() {
    const [channel1, setChannel1] = createSignal<channelType>()
    //const [channel2, setChannel2] = createSignal<channelType>()
    //const [channel3, setChannel3] = createSignal<channelType>()

    onMount(() => {
        setChannel1({
            name: 'Kick',
            audio: new Audio('#'),
            cells: Array<boolean>(16).fill(false),
        })
    })

    function toggleCell(index: number): () => void {
        return () =>
            setChannel1((prev) => {
                let newCells = prev!.cells.slice()
                newCells[index] = !newCells[index]
                return { name: prev!.name, audio: prev!.audio, cells: newCells }
            })
    }

    return (
        <div class="sequencer">
            <Show when={channel1()}>
                <Channel
                    name={channel1()!.name}
                    cells={channel1()!.cells}
                    toggleCell={toggleCell}
                />
            </Show>
        </div>
    )
}

export default Sequencer

function Channel(props: {
    name: string
    cells: boolean[]
    toggleCell: (index: number) => () => void
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
                                toggleCell={props.toggleCell(index())}
                            />
                        )
                    }}
                </For>
            </div>
        </div>
    )
}

function Cell(props: { active: boolean; toggleCell: () => void }) {
    return (
        <div
            class={`cell ${props.active ? 'active' : ''}`}
            onClick={() => props.toggleCell()}
        />
    )
}
