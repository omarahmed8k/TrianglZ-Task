import { Navigate, Route, Routes } from 'react-router-dom';
import Books from '../pages/Books/Books';
import CreateBook from '../pages/Books/Create/Create';
import ReadBook from '../pages/Books/Read/Read';
import EditBook from '../pages/Books/Edit/Edit';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/books" />} />
            <Route path="/*" element={<Navigate replace to="/books" />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<ReadBook />} />
            <Route path="/books/:id/edit" element={<EditBook />} />
        </Routes>
    )
}
