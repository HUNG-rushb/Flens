import ButtonCustom from '../../components/Button/ButtonCustom';
import InputCustom from '../../components/Input/Input.jsx';
import ModalCustom from '../../components/Modal/Modal';
import SelectCustom from '../../components/Select/SelectCustom';
import Page from '../../components/utils/Page.js';
import './CoursesManagement.css';
import TableCoursesDate from './TableCoursesData.jsx';
import React, { Suspense, useEffect, useState } from 'react';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';

const Courses = () => {
  const category_options = [
    { id: 1, value: 'Video courses' },
    { id: 2, value: 'Interactive courses' },
    { id: 3, value: 'Workshop' },
  ];

  const status_options = [
    { id: 1, value: 'All' },
    { id: 2, value: 'Active' },
    { id: 3, value: 'InActive' },
  ];

  const [selectedStatus, setSelectedStatus] = useState(status_options[0].value);

  const handleOnChangeSelectedStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filterStatusSelected = () => {
    const filteredSelected =
      selectedStatus === 'All'
        ? filteredData
        : filteredData.filter((item) => item.status === selectedStatus);
    setFilteredData(filteredSelected);
    
  };

  useEffect(() => {
    filterStatusSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const table_title = [
    { value: 'No' },
    { value: 'Name' },
    { value: 'Created date' },
    { value: 'Status' },
    { value: 'Attendants' },
    { value: '#' },
    { value: '#' },
  ];

  const data = [
    {
      id: 1,
      coursesName: 'Helmut Newton MasterClass',
      createDate: 'July 01, 2022',
      status: 'Active',
      attendants: 30,
    },
    {
      id: 2,
      coursesName: 'Jonathan MasterClass',
      createDate: 'July 01, 2022',
      status: 'InActive',
      attendants: 31,
    },
    {
      id: 3,
      coursesName: 'Anna Lee MasterClass',
      createDate: 'July 01, 2022',
      status: 'Active',
      attendants: 32,
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  

  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [tempObj, setTempObj] = useState({});

  const [editId, setEditId] = useState(0);
  const [editCoursesName, setEditCoursesName] = useState('');
  const [editCreatedDate, setEditCreatedDate] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editAttendants, setEditAttendants] = useState(0);

  const handleClickCreateCourses = () => {};

  const modalEditContent = () => {
    return (
      <form className="bodyContent">
        <div>
          <span>Course name: </span>
          <input
            value={editCoursesName}
            onChange={(e) => {
              setEditCoursesName(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Status:</span>
          <input
            value={editStatus}
            onChange={(e) => {
              setEditStatus(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Attandants: </span>
          <input
            value={editAttendants}
            onChange={(e) => {
              setEditAttendants(e.target.value);
            }}
          />
        </div>
      </form>
    );
  };

  const handleClose = () => {
    showEditModal ? setShowEditModal(false) : setShowRemoveModal(false);
  };

  const handleClickEdit = (item) => {
    setTempObj(item);
    setEditId(item.id);
    setEditCoursesName(item.coursesName);
    setEditCreatedDate(item.createDate);
    setEditStatus(item.status);
    setEditAttendants(item.attendants);
    setShowEditModal(true);
  };

  const handleClickRemove = (item) => {
    setTempObj(item);
    setShowRemoveModal(true);
  };

  const handleSubmitEditModal = () => {
    setEditId(tempObj.id);
    filteredData.splice(editId, 1, {
      id: editId,
      coursesName: editCoursesName,
      createDate: editCreatedDate,
      status: editStatus,
      attendants: editAttendants,
    });

    showEditModal ? setShowEditModal(false) : setShowRemoveModal(false);
  };

  const handleSubmitRemoveModal = () => {
    setFilteredData(
      filteredData.filter((item) => item !== tempObj)
    );
    showEditModal ? setShowEditModal(false) : setShowRemoveModal(false);
  };

  return (
    <Page title={'Flens-Courses'}>
      <Suspense fallback={null}>
        <div className="courses-page">
          <div className="title">Courses</div>
          <div className="create-courses-btn">
            <ButtonCustom
              text={'Create a courses'}
              type="default2"
              onClick={handleClickCreateCourses()}
            />
          </div>
          <div className="body-page">
            <div className="courses-upcontent">
              <div>
                <span>Name</span>
                <InputCustom type={'Text'} placeholder="Search" />
              </div>
              <div>
                <span>Created date</span>
                <input type="date" />
              </div>
              <div>
                <span>Category</span>
                <div>
                  <SelectCustom options={category_options} type="default3" />
                </div>
              </div>
              <div>
                <span>Status</span>
                <div>
                  <SelectCustom
                    options={status_options}
                    type="default3"
                    selected={selectedStatus}
                    handleOnChange={handleOnChangeSelectedStatus}
                  />
                </div>
              </div>
            </div>

            <TableCoursesDate
              titles={table_title}
              body={filteredData}
              PencilSquare={PencilSquare}
              handleClickEdit={handleClickEdit}
              XSquare={XSquare}
              handleClickRemove={handleClickRemove}
            />
            <ModalCustom
              show={showEditModal ? showEditModal : showRemoveModal}
              handleClose={handleClose}
              modalTitle={
                showEditModal
                  ? `Edit Courses "${tempObj.coursesName}" witd id ${tempObj.id}?`
                  : `Wanna remove course id ${tempObj.id}`
              }
              modalContent={
                showEditModal
                  ? modalEditContent()
                  : 'This course will be removed, please be carefull with your decision'
              }
              handleSavechanges={
                showEditModal ? handleSubmitEditModal : handleSubmitRemoveModal
              }
              size={'md'}
              confirmButtonMessage="Submit"
            />
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Courses;
