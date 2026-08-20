import { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { Link } from 'react-router-dom';
import { PostSignUpProps } from '../types';

export default function PostSignUp(props: PostSignUpProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (props.signup.successMess) setLoading(false)
  }, [props.signup])

  if (loading) {
    return (
      <div className="post-signup-container">
        <Loading />
      </div>
    )
  }
  else {
    return (
      <div className="post-signup-container">
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
}
