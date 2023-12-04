import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useSearchResult } from '../../graphql/useSearch';
import useModal from '../../hooks/useModal';
import sliceUsername from '../../utils/sliceUsername';
import Loading from '../../utils/useLoading';
import SimilarImageDetail from './SimilarImageDetail';
import { Suspense, useCallback, useMemo, useState } from 'react';
import Masonry from 'react-layout-masonry';
import { useParams } from 'react-router-dom';

const SearchTagResult = () => {
  const options = useMemo(
    () => [
      { name: 'All categories', id: '64ecb68380295e50c958e547' },
      { name: 'Animal', id: '64edaf03809a20aed5684794' },
      { name: 'Architecture', id: '64edaf2d809a20aed5684795' },
      { name: 'Black and White', id: '64edaf3c809a20aed5684796' },
      { name: 'Cityscapes', id: '64edaf4c809a20aed5684797' },
      { name: 'Family', id: '64edaf62809a20aed5684798' },
      { name: 'Fashion', id: '64edaf66809a20aed5684799' },
      { name: 'Film', id: '64edaf72809a20aed568479a' },
      { name: 'Food', id: '64edaf77809a20aed568479b' },
      { name: 'Vintage', id: '64edafb5809a20aed568479c' },
      { name: 'Vehicle', id: '64edafbb809a20aed568479d' },
      { name: 'Urban', id: '64edafbf809a20aed568479e' },
      { name: 'Underwater', id: '64edb08f809a20aed568479f' },
      { name: 'Travel', id: '64edb0a5809a20aed56847a0' },
      { name: 'Street photography', id: '64edb0ae809a20aed56847a1' },
      { name: 'Sports', id: '64edb0c7809a20aed56847a2' },
      { name: 'Landscape', id: '64edb0df809a20aed56847a3' },
      { name: 'Nature', id: '64edb0e2809a20aed56847a4' },
      { name: 'Sea', id: '64edb0f6809a20aed56847a5' },
      { name: 'People', id: '64edb117809a20aed56847a7' },
      { name: 'Interior', id: '64edb11c809a20aed56847a8' },
      { name: 'Random', id: '64edb0f9809a20aed56847a6' },
    ],
    []
  );

  const { query } = useParams();
  const { id: userId } = useAuthState();
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({});
  const [filterByuser, setFilterByUser] = useState([]);

  const { fetchedData: searchResult, isFetching } = useSearchResult({
    data: { userId, searchString: query },
  });
  console.log({ searchResult }, 'search result');

  const modalContent = useCallback(() => {
    return <SimilarImageDetail imageDetail={selectedItem}  setSelectedItem={setSelectedItem}/>;
  }, [selectedItem]);

  const handleAddFilterByUser = (id) => {
    setFilterByUser((prev) => ({ ...prev, id: id }));
  };
  console.log(filterByuser, 'filter by user');

  return useMemo(
    () => (
      <Page title="Flens-Explore">
        <Suspense fallback={null}>
          <div className="explore-page">
            <div className="options-bar">
              <div className="select-container">
                <select
                  id="select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <p
                style={{ textAlign: 'center', width: '100%', fontSize: '18px' }}
              >
                Flens search result for: <b>{query}</b>
              </p>
            </div>

            <div className="tab-content">
              <div className="result-part">
                <div className="tags-result">
                  <b>Related tags: </b>
                  {searchResult?.searchResult.tags.map((item) => (
                    <span key={item?.name} style={{ padding: '0 2px' }}>
                      #{item?.name}
                    </span>
                  ))}
                </div>

                <div className="user-result">
                  <b>Related users: </b>
                  <div className="users">
                    {searchResult?.searchResult.users.map((item) => (
                      <div
                        key={item?.id}
                        className="content"
                        onClick={() => handleAddFilterByUser(item?.id)}
                      >
                        <img
                          src={item?.profileImageURL}
                          width={30}
                          height={30}
                          alt=""
                        />
                        {sliceUsername(item?.name, 20)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Masonry columns={3} gap={16} className="inspiration-container">
                {searchResult &&
                  searchResult.searchResult.posts.map((item) => {
                    return (
                      <span key={item.id}>
                        <img
                          alt=""
                          src={item.image.url}
                          width="100%"
                          onClick={() => [toggleModal(), setSelectedItem(item)]}
                        />
                      </span>
                    );
                  })}
              </Masonry>
            </div>
          </div>
          <Loading loading={isFetching} />
          <Modal
            show={showModal}
            handleClose={toggleModal}
            handleSavechanges={toggleModal}
            modalContent={modalContent()}
            size="xl"
            hideButton={true}
          />
        </Suspense>
      </Page>
    ),
    [
      isFetching,
      modalContent,
      options,
      query,
      searchResult,
      selectedOption,
      showModal,
      toggleModal,
    ]
  );
};

export default SearchTagResult;
