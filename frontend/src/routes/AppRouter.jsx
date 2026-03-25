import { Routes, Route, Navigate } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
    </Routes>
  );
}