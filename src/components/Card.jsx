function Card({name, img, id}) {
    return(
        <div className="card" data-id={id}>
                <img src={img} />
                <p>{name}</p>
        </div>
    )
}

export default Card;