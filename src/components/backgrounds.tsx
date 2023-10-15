import { useLocation   } from 'react-router-dom';

interface Props {
    changeBackgrounds: any;
}
export default function Backgrounds(props: Props) {
    const { pathname } = useLocation()
    const backgroundList = ["#5f73c2", "#a464a6", "#c75171", "#c7534e", "#378f68", "#2e8984", "#6d7b86", "#d6a656", "#dfedf9", "#f2e7f9", "#ffe4e9", "#f9e8de", "#d5f1e5", "#d4f1ef", "#e7ecf0"]
    const user = JSON.parse(localStorage.getItem("id") || '')
    const path = pathname.split('/')[1]
    const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
    const types = backgroundList.map((item, index) => {
        return (
            <div key={index} className="links" style={{ backgroundColor: item }}
                onClick={() => props.changeBackgrounds(user, {
                    type: backgroundType,
                    value: item
                })} ></div>
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