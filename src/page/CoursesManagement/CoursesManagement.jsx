import ButtonCustom from '../../components/Button/ButtonCustom';
import InputCustom from '../../components/Input/Input.jsx';
import ModalCustom from '../../components/Modal/ModalCustom';
import SelectCustom from '../../components/Select/SelectCustom';
import Page from '../../components/utils/Page.js';
import useModal from '../../hooks/useModal';
import './CoursesManagement.scss';
import TableCoursesDate from './TableCoursesData.jsx';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';

const Courses = () => {
  const category_options = useMemo(
    () => [
      { id: 1, value: 'Video courses' },
      { id: 2, value: 'Interactive courses' },
      { id: 3, value: 'Workshop' },
    ],
    []
  );

  const status_options = useMemo(
    () => [
      { id: 1, value: 'All' },
      { id: 2, value: 'Active' },
      { id: 3, value: 'InActive' },
    ],
    []
  );

  const table_title = useMemo(
    () => ['No', 'Name', 'Created date', 'Status', 'Attendants', '#', '#'],
    []
  );

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

  const [selectedStatus, setSelectedStatus] = useState(status_options[0].value);
  const [filteredData, setFilteredData] = useState(data);

  const { isShowing: showModal, toggle: toggleModal } = useModal();

  const [targetCourses, settargetCourses] = useState({});

  const [editId, setEditId] = useState(0);
  const [editCoursesName, setEditCoursesName] = useState('');
  const [editCreatedDate, setEditCreatedDate] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editAttendants, setEditAttendants] = useState(0);

  const handleClickCreateCourses = useCallback(() => {}, []);

  const [checkEditOrDelete, setCheckEditOrDelete] = useState('');

  const modalTitle = useMemo(() => {
    if (checkEditOrDelete === 'edit') {
      return `Edit Courses "${targetCourses.coursesName}" witd id ${targetCourses.id}?`;
    } else return `Wanna remove course id ${targetCourses.id}`;
  }, [checkEditOrDelete, targetCourses.coursesName, targetCourses.id]);

  const modalContent = useMemo(() => {
    if (checkEditOrDelete === 'edit') {
      return (
        <div className="bodyContent">
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
        </div>
      );
    } else
      return (
        <p>
          This course will be removed, please be carefull with your decision!
        </p>
      );
  }, [checkEditOrDelete, editAttendants, editCoursesName, editStatus]);

  const handleClose = useCallback(() => {
    toggleModal();
    setCheckEditOrDelete('');
  }, [toggleModal]);

  const handleClickEdit = useCallback(
    (item) => {
      setCheckEditOrDelete('edit');
      settargetCourses(item);
      setEditId(item.id);
      setEditCoursesName(item.coursesName);
      setEditCreatedDate(item.createDate);
      setEditStatus(item.status);
      setEditAttendants(item.attendants);
      toggleModal();
    },
    [toggleModal]
  );

  const handleClickRemove = useCallback(
    (item) => {
      setCheckEditOrDelete('delete');
      settargetCourses(item);
      toggleModal();
    },
    [toggleModal]
  );

  const handleSubmit = useCallback(() => {
    if (checkEditOrDelete === 'edit') {
      setEditId(targetCourses.id);
      filteredData.splice(editId, 1, {
        id: editId,
        coursesName: editCoursesName,
        createDate: editCreatedDate,
        status: editStatus,
        attendants: editAttendants,
      });
    } else {
      setFilteredData(filteredData.filter((item) => item !== targetCourses));
    }
    toggleModal();
  }, [
    checkEditOrDelete,
    editAttendants,
    editCoursesName,
    editCreatedDate,
    editId,
    editStatus,
    filteredData,
    targetCourses,
    toggleModal,
  ]);

  const handleOnChangeSelectedStatus = useCallback((event) => {
    setSelectedStatus(event.target.value);
  }, []);

  const filterStatusSelected = useCallback(() => {
    const filteredSelected =
      selectedStatus === 'All'
        ? filteredData
        : filteredData.filter((item) => item.status === selectedStatus);
    setFilteredData(filteredSelected);
  }, [filteredData, selectedStatus]);

  useEffect(() => {
    filterStatusSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  return useMemo(
    () => (
      <Page title={'Flens-Courses management'}>
        <Suspense fallback={null}>
          <div className="courses-management">
            <div className="title">Courses management</div>
            <div className="create-courses-btn">
              <ButtonCustom
                text={'Create a courses'}
                type="default2"
                onClick={handleClickCreateCourses()}
              />
            </div>
            <div className="body">
              <div className="content">
                <div className="content-item">
                  <span id="label">Name</span>
                  <InputCustom type={'Text'} placeholder="Search" />
                </div>
                <div className="content-item">
                  <span id="label">Created date</span>
                  <input type="date" />
                </div>
                <div className="content-item">
                  <span id="label">Category</span>
                  <div>
                    <SelectCustom options={category_options} type="default3" />
                  </div>
                </div>
                <div className="content-item">
                  <span id="label">Status</span>
                  <div>
                    <SelectCustom
                      options={status_options}
                      type="default3"
                      selected={selectedStatus}
                      onChange={handleOnChangeSelectedStatus}
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
                show={showModal}
                handleClose={handleClose}
                modalTitle={modalTitle}
                modalContent={modalContent}
                handleSavechanges={handleSubmit}
                size={'md'}
                confirmButtonMessage="Submit"
              />
            </div>
          </div>
        </Suspense>
      </Page>
    ),
    [
      showModal,
      modalTitle,
      table_title,
      filteredData,
      modalContent,
      selectedStatus,
      status_options,
      category_options,
      handleClose,
      handleSubmit,
      handleClickEdit,
      handleClickRemove,
      handleClickCreateCourses,
      handleOnChangeSelectedStatus,
    ]
  );
};

export default Courses;
