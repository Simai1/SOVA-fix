import React, { useEffect, useState } from 'react';
import styles from './EditColum.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { onCheckState, resetAllColumns } from '../../store/editColumTable/editColumTable.slice';

function EditColum() {
    const [openList, setOpenList] = useState(false);
    const store = useSelector(state => state.editColumTableSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("store",  store.AllCheckbox);
       
    },[store])

    return ( 
        <div className={styles.EditColum}>
            <div>
                <button onClick={() => setOpenList(!openList)} style={{ borderRadius:  !openList ? "40px 40px 40px 40px" : "20px 20px 0 0"  }}>
                    Редактор полей
                    <img 
                        className={styles.EditColumImg}
                        style={{ transform: !openList ? "rotate(0deg)" : "rotate(180deg)" }} 
                        src='./img/arrow_bottom.svg' 
                        alt="Arrow Icon"
                    />
                </button>
                {
                    openList && 
                    <div className={styles.Overlay}>
                        <ul>
                                <li>
                                    <input type='checkbox' checked={store.AllCheckbox} readOnly onClick={() => dispatch(resetAllColumns())}/>
                                    <span>Все</span>
                                </li>
                            {store.ActiveColumTable.map((el, index) => (
                                <li key={index}>
                                    <input type='checkbox' checked={el.isActive} readOnly onClick={() => dispatch(onCheckState(el.key))}/>
                                    <span>{el.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default EditColum;
