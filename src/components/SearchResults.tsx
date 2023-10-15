import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";
import { connect } from "react-redux";
import { searchSuccess } from '../redux/ActionCreators';
const mapStateToProps = (state: any) => {
    return {
      searchResult: state.searchResult.search,
      backgrounds: state.backgrounds.colors
    };
  };
function SearchResults(props:any) {
    const [results, setResults] = useState([])
    const { pathname } = useLocation()
    useEffect(()=>{
        if(props.searchResult){
            setResults(props.searchResult)
        }
    },[props.searchResult])
    useEffect(()=>{
        return function(){
            props.dispatch(searchSuccess([]));
            setResults([])
        }
    },[])
    useEffect(() => {
        if (props.backgrounds) {
            const element:any = document.querySelector('.search-container')
            const path = pathname.split('/')[1]
            const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
            element.style.backgroundColor = props.backgrounds[backgroundType]
        }
    }, [props.backgrounds])
    const Search = results.length ?
        results.map((item: any) => {
            return (
                <div className="task-item" key={item._id}>
                    <div className="task-description">
                        {
                            item.done ?
                                <span className="done-mark bi bi-check done-mark-ckeck" ></span>
                                :
                                <span className="done-mark" ></span>
                        }
                        <div>{item.description}</div>
                    </div>
                    <div >
                        <span className="cursor bi bi-star"></span>
                    </div>
                </div>
            )
        })
        :
        <div className="img-container" >
            <div className="icon-svg svg-today">
                <img src={'/backgrounds/list.svg'} alt="" />
            </div>
        </div>
    return (
        <div className="search-container">
            <div className="title-container" >
                <div className="title-item" >
                    <span className="bi bi-sun"></span>
                    <span>Tareas encontradas</span>
                </div>
                <div className="title-settings" onClick={addClassListEvent}>
                    <span className="bi bi-columns-gap"></span>
                </div>
            </div>
            <div className="search-results">
                {Search}
            </div>
        </div>
    )
}
export default connect(mapStateToProps, null)(SearchResults)