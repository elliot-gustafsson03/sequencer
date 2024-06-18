import { createSignal } from 'solid-js'

function Options(props: {
    clear: () => void
    save: () => void
    load: (e: InputEvent) => void
}) {
    const [openPanel, setOpenPanel] = createSignal(false)

    function saveAndClose() {
        props.save()
        setOpenPanel(false)
    }

    function loadAndClose(e: InputEvent) {
        props.load(e)
        setOpenPanel(false)
    }

    function clearAndClose() {
        props.clear()
        setOpenPanel(false)
    }

    return (
        <>
            <div class={`options ${openPanel() ? 'open' : ''}`}>
                <div class="options-panel">
                    <Button label="Save" onClick={saveAndClose} />

                    <input
                        type="file"
                        class="option"
                        oninput={loadAndClose}
                        style={{ width: '200px' }}
                        accept=".bt"
                    />
                    <Button
                        label="Clear"
                        color="#962a2a"
                        onClick={clearAndClose}
                    />
                </div>
            </div>
            <div
                class="options-btn"
                onClick={() => setOpenPanel((prev) => !prev)}
            >
                <img src={openPanel() ? 'close.svg' : 'options.svg'} />
            </div>
        </>
    )
}

export default Options

function Button(props: { label: string; color?: string; onClick: () => void }) {
    return (
        <span
            class="option"
            style={{ color: props.color }}
            onClick={() => props.onClick()}
        >
            {props.label}
        </span>
    )
}
