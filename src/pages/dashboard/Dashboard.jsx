import { useEffect, useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import { DashProduct } from "../../components/DashProduct";
import useAuth from "../../hooks/useAuth";
import { convertToReal } from "../../helpers/general";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
export const Dashboard = () => {
    const [report, setReport] = useState({})
    const { user } = useAuth()
    const { getProductionReport } = useDashboard()

    const data = [
        { name: 'Jan', vendas: 400 },
        { name: 'Fev', vendas: 700 },
        { name: 'Mar', vendas: 500 },
        { name: 'Abr', vendas: 1000 },
        { name: 'Mai', vendas: 850 },
    ]

    const usersProduction = [
        { name: 'Funcionário A', value: 40 },
        { name: 'Funcionário B', value: 30 },
        { name: 'Funcionário C', value: 20 },
        { name: 'Funcionário D', value: 80 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        const loadData = async () => {
            const data = await getProductionReport()
            setReport(data)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{ maxWidth: '95%' }}>
                <h3 className="text-center fw-normal mb-3">Dashboard</h3>

                {/* Produção geral por mês */}
                <div className="border rounded-2 p-2 mx-1 pb-5" style={{ height: 250, opacity: 0.2 }}>
                    <h5 className="text-center">Produção Mensal</h5>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            {/* Grade de fundo */}
                            <CartesianGrid strokeDasharray="1 4" />

                            {/* Eixos */}
                            <XAxis dataKey="name" />
                            <YAxis />

                            {/* Interatividade */}
                            <Tooltip />
                            {/* <Legend /> */}

                            {/* A linha do gráfico */}
                            <Line
                                type="monotone"
                                dataKey="vendas"
                                stroke="#0dcaf0"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <div className="row p-3" style={{ height: 300 }}>
                    {/* Produção por funcionário */}
                    {['MASTER', 'ADMIN'].includes(user.role) && <>
                        <div className="col border text-center me-3 p-2 rounded-2" style={{ opacity: 0.2 }}>
                            <h5 className="mb-0">Produção por Funcionário</h5>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={usersProduction}
                                        cx="50%"
                                        cy="50%"
                                        fontSize="11px"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Rótulos com nome e porcentagem
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value" // A chave do objeto que contém o valor
                                    >
                                        {/* Mapeia as cores para cada fatia */}
                                        {usersProduction.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip /> {/* Exibe detalhes ao passar o mouse */}
                                    {/* <Legend content={<CustomLegend />} />  */}
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </>}

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