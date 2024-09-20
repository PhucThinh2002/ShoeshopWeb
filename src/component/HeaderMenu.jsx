import { Link } from 'react-router-dom';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserLogin } from '../Redux/reducers/userReducer';
import { Button, Modal } from 'antd'; 
import '../assets/scss/Header.scss';
import logo from '../assets/img/Cybersoft.png';

const HeaderMenu = () => {
  const cart = useSelector(state => state.cartSliceReducer.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const userLogin = useSelector(state => state.userReducer.userLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Modal.confirm({
      title: 'Đăng xuất',
      content: 'Bạn chắc chắn đăng xuất',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        dispatch(clearUserLogin());
      }
    });
  };

  return (
    <div className="header">
      <div className="navi-top">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="login">
          <div className="search-container">
            <SearchOutlined style={{ fontSize: '20px', color: '#fff' }} />
            <Link to="/search" className="search-text">Search</Link>
          </div>
          <Link to="/cart">
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            <span>({cartItemCount})</span>
          </Link>
          {userLogin ? (
            <>
              <span className='text-white mx-1'>{userLogin.email}</span>
              <Link to="/profile" className="mx-1">Profile</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <div id="bars">Menu</div>
        </div>
      </div>
      <div className="navi-bottom">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">Men</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">Women</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">Kid</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">Sport</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMenu;
