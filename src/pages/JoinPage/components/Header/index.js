import style from "./style.module.scss";

export const Header = ({ toggleShow, userList, user }) => {
  return (
    <div className={style.header}>
      <div className={style.qrcode} onClick={toggleShow.bind(this, 'qrcode')} />
      <div className={style.playerCount} onClick={toggleShow.bind(this, 'player')}>
        {userList.length} Player
      </div>
      <div className={style.fit} />
      <div className={style.userName} onClick={toggleShow.bind(this, 'rename')}>
        {user.name}
      </div>
      <div className={style.matrix} onClick={toggleShow.bind(this, 'editor')}/>
    </div>
  );
};
