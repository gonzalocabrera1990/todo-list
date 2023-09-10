import { useEffect, useState } from 'react';
import { Loading } from './loading';
import { Link } from 'react-router-dom';

interface Props {
  signup: any;
}

export default function PostSignUp(props: Props) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (props.signup.successMess) setLoading(false)
  }, [props.signup])
  if (loading) {
    return (
      <div >
        <Loading />
      </div>
    )
  }
  else {
    return (
      <div className="container">
        <div className="row">
          <h3 className="col-12 text-center">{props.signup.successMess}</h3>
        </div>
        <div className="row">
          <button>
            <Link to={`/login`}>
              Ir a la app
            </Link>
          </button>
        </div>
      </div>
    );
  }
};