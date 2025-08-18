import React,{Fragment} from 'react'
import "./css/index.css"
import apiService from "./ApiService/apiService";
import CheckBox from "./Controls/RadioButton/CheckBox";
import CheckBoxWhite from './Controls/RadioButton/CheckBoxWhite';
import RadioButton from './Controls/RadioButton/RadioButton';
import Input from './Controls/Input/Input';
import InputComment from './Controls/Input/InputComment';
import InputNumber from './Controls/Input/InputNumber';
import ItemCodeInput from './Controls/Input/ItemCodeInput';
import DatePicker from './Controls/DatePicker/datepicker';
import DateRangePicker from './Controls/DatePicker/DateRangePicker';
import PaginationComp from './Controls/Pagination/Pagination';
import GridPaginationComp from './Controls/Pagination/GridPagination';
import PopupPaginationComp from './Controls/Pagination/PopupPagination';
import SaveCancelBtn from './Controls/Button/SaveCancelBtn';
import UpdateCancelBtn from './Controls/Button/UpdateCancel';
import SaveUpdateBtn from './Controls/Button/SaveUpdateBtn';
import SearchResetBtn from './Controls/Button/SearchResetBtn';
import FileLoader from './Controls/FileLoader/FileLoader';
import Tabs from './Controls/Tabs/Tabs';
import ShowHideContainer from './Controls/Slider/ShowHideContainer';
import LeftMenu from './Controls/LeftMenu/LeftMenu';
import RecordGrid from './Controls/RecordGrid/RecordGrid';
import ConfirmationPopup from "./Controls/Popup/ConfirmationPopup"
import InformationPopup from "./Controls/Popup/InformationPopup"
import OptionSelection from './Controls/DropDown/OptionSelection';
import OptionSelectorTopMenu from './Controls/DropDown/OptionSelectorTopMenu';
import {addDataIndexDb,updateDataIndexDb,deleteDataIndexDb,getTableData,syncIndexDb,initDb,checkExistance,getTableDataByKey,syncUpdateDataIndexDb,getDataForDropDown} from "./IndexDbServices/indexDbServices"
import {useGetAllDataOfTable} from "./CustomHooks/GetAllDataOfTable"
import {useGetTokenValue} from "./CustomHooks/GetTokenValue"
import MailPopup from "./Controls/Popup/MailPopup"
import {sendEmail} from "./Controls/Mail/Email"

export {apiService};
export {CheckBox};
export {CheckBoxWhite};
export {RadioButton};
export {Input};
export {InputComment};
export {InputNumber};
export {ItemCodeInput};
export {DatePicker};
export {DateRangePicker};
export {PaginationComp};
export {GridPaginationComp};
export {PopupPaginationComp};
export {SaveCancelBtn};
export {UpdateCancelBtn};
export {SaveUpdateBtn};
export {SearchResetBtn};
export {FileLoader};
export {Tabs};
export {ShowHideContainer};
export {LeftMenu};
//export {default as LeftMenuMUI} from './Controls/LeftMenu/LeftMenuMUI.jsx';
export {RecordGrid};
export {InformationPopup};
export {ConfirmationPopup};
export {OptionSelection};
export {OptionSelectorTopMenu};
export {addDataIndexDb}
export {initDb}
export {useGetTokenValue}
export {useGetAllDataOfTable}
export {syncIndexDb}
export {updateDataIndexDb}
export {deleteDataIndexDb}
export {checkExistance}
export {getTableDataByKey}
export {syncUpdateDataIndexDb}
export {MailPopup}
export {sendEmail}
export {getDataForDropDown}
export {getTableData}