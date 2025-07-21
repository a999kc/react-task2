import { Link } from 'react-router';
import classes from '@styles/Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <nav className={classes.headerNav}>
          <Link to="/" className={classes.headerLink}>
            {' '}
            Все задачи
          </Link>

          <Link to="/task/new" className={classes.headerLink}>
            Создать задачу
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
