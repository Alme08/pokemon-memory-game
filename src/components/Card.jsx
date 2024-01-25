import Tilt from 'react-parallax-tilt';

function Card({name, img, id, handleCardClick, isFlipped}) {

    return(
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => handleCardClick(id)} >
            <Tilt   tiltReverse
                    reset
                    glareEnable={true}
                    glareMaxOpacity={0.4}
                    glareColor='#ffffff'
                    glarePosition='all'
                    glareBorderRadius='10px'
                    className='tilt'>

                <div className='front' >
                    <img className='characterHolder' src={img} />
                    <p className='name'>{name}</p>
                </div>
                <div className='back'>
                </div>
            </Tilt>
        </div>
    )
}

export default Card;
