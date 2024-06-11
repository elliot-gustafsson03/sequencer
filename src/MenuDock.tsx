import { createSignal } from 'solid-js'

function MenuDock(props: {
    play: () => void
    pause: () => void
    stop: () => void
}) {
    const [paused, setPaused] = createSignal(true)

    function togglePause() {
        setPaused((prev) => {
            prev ? props.play() : props.pause()
            return !prev
        })
    }

    function clickStop() {
        setPaused(true)
        props.stop()
    }

    return (
        <div class="menu-dock">
            <Button icon="stop.svg" onClick={clickStop} />
            <Button
                icon={paused() ? '/play.svg' : '/pause.svg'}
                onClick={togglePause}
            />
        </div>
    )
}

export default MenuDock

function Button(props: { icon: string; onClick: () => void }) {
    return (
        <div class="btn" onClick={() => props.onClick()}>
            <img src={props.icon} />
        </div>
    )
}
