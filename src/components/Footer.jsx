import { useState } from "react"
export const Footer = () => {
    const [currentYear] = useState(new Date().getFullYear())
    return(
        <>
        <footer>
            <p className="mt-5 mb-3 text-body-secondary text-center">&copy; {currentYear} Sales Force</p>
        </footer>
        </>
    )
}