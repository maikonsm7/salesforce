export const DashProduct = ({prod, value}) => {
    return (
        <p>
            <span className="text-secondary">{prod}:</span>
            <span className="mx-2 text-info fw-bold">{value}</span>
        </p>
    )
}