import { createSignal } from 'solid-js'
import MenuDock from './MenuDock'
import Sequencer from './Sequencer'
import './css/App.css'
import { ChildComponentRef } from './Sequencer'

function App() {
    const [bpm, setBpm] = createSignal(120)

    let childRef: ChildComponentRef
    let seqIndex = 0
    let interval: number | undefined

    function setRef(ref: ChildComponentRef) {
        childRef = ref
    }

    function play() {
        interval = setInterval(incSeq, (60 * 1000) / (bpm() * 4))
    }

    function pause() {
        clearInterval(interval)
    }

    function stop() {
        pause()
        seqIndex = 0

        if (childRef) {
            childRef.triggerSeq(-1)
        }
    }

    function incSeq() {
        if (childRef) {
            childRef.triggerSeq(seqIndex)
        }
        seqIndex = (seqIndex + 1) % 16
    }

    return (
        <>
            <Sequencer refSetter={setRef} />
            <MenuDock
                play={play}
                pause={pause}
                stop={stop}
                bpm={bpm()}
                setBpm={(bpm: number) => setBpm(bpm)}
            />
        </>
    )
}

export default App
