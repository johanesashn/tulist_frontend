export default function Header(props) {
    return (
        <>
            <div className="header">
                <h1 className='title'>{`${props.greet}, ${props.username}`}</h1>
                <div className="quote">
                    <h1 className='sub-title'>Be Productive <span className="space"></span></h1>
                    <h1 className='sub-title'>in Your Day!!!</h1>
                </div>
            </div>
        </>
    )
}