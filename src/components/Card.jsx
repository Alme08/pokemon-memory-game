function Card({name, img, id, handleCardClick, isFlipped}) {
    return(
        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-id={id}>
                <div className="front" onClick={() => handleCardClick(id)} >
                    <img src={img} />
                    <p>{name}</p>
                </div>

                <div className="back">Back</div>
        </div>
    )
}

export default Card;