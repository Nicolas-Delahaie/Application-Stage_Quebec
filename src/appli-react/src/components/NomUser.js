import { Link } from "react-router-dom"


function NomUser({ user, cliquable = false }) {
    if (!user) {
        console.error("NomUser doit avoir un user en parametre");
    }

    return (
        cliquable ?
            <Link className="lienUser" to={`/profils/${user.id}`}>{user.nom} {user.prenom}</Link>
            :
            <>{user.nom} {user.prenom}</>
    )
}
export default NomUser;