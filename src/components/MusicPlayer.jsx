import { useRef, useState } from 'react';
import ost from '../assets/ost.mp3';

function MusicPlayer() {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<div className='musicPlayer'>
			<button onClick={togglePlay}>
				{isPlaying ? (
					<i className='fa-solid fa-volume-high'></i>
				) : (
					<i className='fa-solid fa-volume-xmark'></i>
				)}
			</button>
			<audio ref={audioRef} loop>
				<source src={ost} type='audio/mpeg' />
				Tu navegador no soporta la reproducción de audio.
			</audio>
		</div>
	);
}

export default MusicPlayer;
