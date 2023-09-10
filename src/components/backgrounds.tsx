export default function Backgrounds() {
   const backgroundList = ["#5f73c2","#a464a6","#c75171","#c7534e","#378f68","#2e8984","#6d7b86","#d6a656","#dfedf9","#f2e7f9","#ffe4e9","#f9e8de","#d5f1e5","#d4f1ef","#e7ecf0"]
   const types = backgroundList.map(item => {
    return(
        <div className="links" style={{backgroundColor: item }}></div>
    )
   })
    return (
        <div className='draw' id='draw'>
            <span>Temas</span>
            <div className='draw-nav' >
                {types}
            </div>
        </div>
    )
}