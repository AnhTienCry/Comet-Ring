import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { createProduct } from '../../services/api';
import type { Collection } from '../../types/catalog';
import { fetchCollections } from '../../services/api';

interface ProductFormProps {
  onClose?: () => void;
}

const ProductForm = ({ onClose }: ProductFormProps): ReactElement => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [collectionSlug, setCollectionSlug] = useState('');
  const [category, setCategory] = useState('ring');
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const data = await fetchCollections();
        setCollections(data);
        if (data.length > 0) setCollectionSlug(data[0].slug);
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append('name', name);
      form.append('slug', slug);
      form.append('price', String(price));
      form.append('description', description);
      form.append('collection', collectionSlug);
      form.append('category', category);

      if (images) {
        for (let i = 0; i < images.length; i++) {
          form.append('images', images[i]);
        }
      }

      await createProduct(form);
      setMessage('Tạo sản phẩm thành công');
      setName('');
      setSlug('');
      setPrice(0);
      setDescription('');
      setImages(null);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage('Có lỗi xảy ra khi tạo sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h2>Thêm sản phẩm mới</h2>
          {onClose && (
            <button className="admin-modal__close" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
        <div className="admin-modal__body">
          {message && <div className="alert alert--success">{message}</div>}
          <form onSubmit={handleSubmit} className="admin-product-form">
        <label>
          Tên
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Slug
          <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </label>
        <label>
          Giá (VND)
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </label>
        <label>
          Mô tả
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Bộ sưu tập
          <select value={collectionSlug} onChange={(e) => setCollectionSlug(e.target.value)}>
            {collections.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Danh mục
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="ring">Ring</option>
            <option value="necklace">Necklace</option>
            <option value="earring">Earring</option>
            <option value="bracelet">Bracelet</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Hình ảnh (tối đa 8)
          <input type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} />
        </label>
        <div>
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Đang tải...' : 'Tạo sản phẩm'}
          </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
