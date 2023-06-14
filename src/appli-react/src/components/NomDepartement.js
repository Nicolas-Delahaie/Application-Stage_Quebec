import { Link } from "react-router-dom"


function NomDepartement({ dept, cliquable = false }) {
    if (!dept) {
        console.error("NomDepartement doit avoir un departement en parametre");
    }

    return (
        cliquable ?
            <Link className="lienUser" to={`/departements/${dept.id}`}>{dept.nom}</Link>
            :
            <>{dept.nom} {dept.prenom}</>
    )
}
export default NomDepartement;