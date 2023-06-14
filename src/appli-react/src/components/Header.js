// Librairies
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../utils/context/context"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

/* ----------------------------------- DOM ---------------------------------- */

function Header() {
    const { estConnecte, deconnexion, getType } = useContext(AppContext);
    const [type, setType] = useState();

    useEffect(() => {
        setType(getType());
    }, [estConnecte])

    return (
        <header className={estConnecte ? "headerConnecte" : "headerDeconnecte"}>
            <Link to="/">
                <img src="https://cstjean.omnivox.ca/Cache/AttatchWebPartNewsTemp/Prod/JEA/id-comm-v19-3c2da998-982c-4a2b-901f-94bc482f2286small.temp.jpg?i=RldsQE5kOkhfNjVZb0lXbkNQYA**" alt="logo" className="logo" />
            </Link>

            <div>
                {estConnecte && type === "administrateur" &&
                    <>
                        <Link className="LienSouligne" to="/scenarios">Scénarios</Link>
                        <Link className="LienSouligne" to="/departements/">Départements</Link>
                        <Link className="LienSouligne" to="/liberations">Libérations</Link>
                    </>
                }
                {estConnecte && type === "responsable" &&
                    <>
                        <Link className="LienSouligne" to="/scenarios">Scénarios</Link>
                        <Link className="LienSouligne" to="/departements/">Départements</Link>
                        <Link className="LienSouligne" to="/liberations">Libérations</Link>
                        <Link className="LienSouligne" to="profil">Mon profil</Link>
                    </>
                }
                {estConnecte && type === "professeur" &&
                    <>
                        <Link className="LienSouligne" to="/scenarios">Scénarios</Link>
                        <Link className="LienSouligne" to="profil">Mon profil</Link>
                    </>
                }
            </div>

            {estConnecte ?
                <button onClick={() => deconnexion()} className="btnDroit">Se déconnecter</button>
                :
                <Link className="lienBtn btnDroit" to="/login">
                    Se connecter
                </Link>
            }
        </header>
    )
}

export default Header