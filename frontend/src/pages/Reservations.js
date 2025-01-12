import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Reservations = () => {
    const id = useParams().id;
    const [reservations, setReservations] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalReservations: 0 });
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pl-PL', options).format(date);
    };

    const fetchReservations = (page) => {
        fetch(`http://localhost:8000/api/reservations/restaurant/${id}?page=${page}&limit=5`)
            .then((res) => res.json())
            .then((data) => {
                setReservations(data.reservations);
                setPagination(data.pagination);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchReservations(pagination.page);
    }, [id, pagination.page]);

    const deleteReservation = (reservationId) => {
        fetch(`http://localhost:8000/api/reservations/${reservationId}`, { method: 'DELETE' })
            .then((res) => {
                if (res.ok) {
                    setReservations((prev) => prev.filter((res) => res.reservation_id !== reservationId));
                } else {
                    console.error('Failed to delete reservation');
                }
            })
            .catch((err) => console.error(err));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, page: newPage }));
        }
    };

    return (
        <div>
            <h2 className="addrestaurant">Rezerwacje:</h2>

            <ul className="reservation-ul">
                {reservations.map((res) => (
                    <li className="reservation-li" key={res.reservation_id}>
                        <div>
                            <p>
                                <strong>Restauracja:</strong> {res.restaurant_name}<br />
                                <strong>Rezerwujący:</strong> {res.customer_name} ({res.customer_email}, id: {res.user_id})<br />
                                <strong>Data:</strong> {formatDate(res.reservation_start)} - {formatDate(res.reservation_end)}<br />
                                <strong>Stolik:</strong> Miejsca: {res.seats} ({res.description}, id: {res.table_id})<br />
                            </p>
                            <button className="adminButton2" onClick={() => navigate(`/reservation/${id}/edit/${res.reservation_id}`)}>Edytuj</button>
                            <button className="adminButton2" style={{ backgroundColor: "#B60606FF" }} onClick={() => deleteReservation(res.reservation_id)}>Anuluj</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button
                    className="adminButton4"
                    style={{ marginLeft: "50px", marginRight: "20px" }}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                >
                    Poprzednia
                </button>
                <span>{pagination.page} / {pagination.totalPages}</span>
                <button
                    className="adminButton4"
                    style={{ marginLeft: "20px" }}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                >
                    Następna
                </button>
            </div>
        </div>
    );
};

export default Reservations;
