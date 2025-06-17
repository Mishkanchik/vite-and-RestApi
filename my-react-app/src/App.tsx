import "./App.css";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "./services/apiCategory.ts";
import type { ICategoryItem } from "./services/types";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const { data: list, isLoading, error } = useGetCategoriesQuery(undefined);
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateCategory({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      await addCategory(formData);
    }
    setFormData({ name: "", slug: "", description: "" });
  };

  const handleEdit = (item: ICategoryItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong.</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Привіт козаки</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Назва"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Слаг"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Опис"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="col-md-2 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {editingId ? "Оновити" : "Додати"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary flex-grow-1"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: "", slug: "", description: "" });
                }}
              >
                Скасувати
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Назва</th>
            <th>Слаг</th>
            <th>Опис</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item: ICategoryItem) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(item)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteCategory(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
