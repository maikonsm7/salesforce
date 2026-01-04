import { useEffect, useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import { DashProduct } from "../../components/DashProduct";
import { convertToReal } from "../../helpers/general";

export const Dashboard = () => {
    const [productions, setProductions] = useState([])
    const [report, setReport] = useState({})
    const [filter, setFilter] = useState('')
    const { getAllProductions } = useDashboard()

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllProductions()
            setProductions(data)
            setFilter('Acumulado')
        }
        loadData()
    }, [])

    useEffect(() => {
        const reportFilter = () => {
            const hoje = new Date();
            const anoAtual = hoje.getFullYear();
            const mesAtual = hoje.getMonth();
            const diaAtual = hoje.getDate();

            let filteredProductions = [];

            if (filter === 'Acumulado') {
                filteredProductions = productions;
            } else if (filter === 'Mensal') {
                filteredProductions = productions.filter(prod => {
                    const prodDate = new Date(prod.createdAt);
                    return prodDate.getFullYear() === anoAtual && prodDate.getMonth() === mesAtual;
                });
            } else if (filter === 'Dia') {
                filteredProductions = productions.filter(prod => {
                    const prodDate = new Date(prod.createdAt);
                    return prodDate.getFullYear() === anoAtual && prodDate.getMonth() === mesAtual && prodDate.getDate() === diaAtual;
                });
            }

            let reportFiltered = {
                consignado: 0,
                parcelado: 0,
                conta: 0,
                cartao: 0,
                lime: 0,
                chess: 0,
                consorcio: 0,
                microsseguro: 0,
            };

            filteredProductions.forEach(prod => {
                reportFiltered.consignado += prod.consignado || 0;
                reportFiltered.parcelado += prod.parcelado || 0;
                reportFiltered.conta += prod.conta || 0;
                reportFiltered.cartao += prod.cartao || 0;
                reportFiltered.lime += prod.lime || 0;
                reportFiltered.chess += prod.chess || 0;
                reportFiltered.consorcio += prod.consorcio || 0;
                reportFiltered.microsseguro += prod.microsseguro || 0;
            });
            setReport(reportFiltered);
        }

        reportFilter()

    }, [filter])

    return (
        <>
            <div className="m-auto" style={{maxWidth: 730}}>
                <h3 className="text-center fw-normal mb-3">Dashboard</h3>

                <div className="d-flex align-items-center">
                    <label htmlFor="filter" className="me-3">Filtro</label>
                    <div>
                        <select className="form-select" name="filter" value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value="Acumulado">Acumulado</option>
                            <option value="Mensal">Mensal</option>
                            <option value="Dia">Dia</option>
                        </select>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="col border rounded-2 p-2">
                        <h5 className="text-center">Venda por Produto</h5>

                        <div className="row row-cols-md-2 mt-3 p-2" style={{ fontSize: '10pt' }}>
                            <div className="col">
                                <DashProduct prod={"Emp. Consignado"} value={convertToReal(report.consignado) || ""} />
                                <DashProduct prod={"Abertura de conta"} value={report.conta || ""} />
                                <DashProduct prod={"Emp. Pessoal (Lime)"} value={report.lime || ""} />
                                <DashProduct prod={"Microseguro"} value={report.microsseguro || ""} />
                            </div>

                            <div className="col">
                                <DashProduct prod={"Créd. Parcelado"} value={convertToReal(report.parcelado) || ""} />
                                <DashProduct prod={"Cartão de crédito"} value={report.cartao || ""} />
                                <DashProduct prod={"Cheque Especial"} value={report.chess || ""} />
                                <DashProduct prod={"Consórcio"} value={report.consorcio || ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}