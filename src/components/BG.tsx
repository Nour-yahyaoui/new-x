import Threads from '../bits/Threades';

export default function Home() {
    return(
        <>
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Threads
            amplitude={2}
            distance={0}
            enableMouseInteraction={false}
        />
        </div>
        </>
    )
}