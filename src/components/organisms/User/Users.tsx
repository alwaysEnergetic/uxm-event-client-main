import { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import UserItem from "./UserItem";
import { useForm } from "react-hook-form";
import Accordion from "react-bootstrap/Accordion";
import { getGqlClient } from "src/lib/gqlClient";
import { usersQuery, genresQuery, categoriesQuery } from "src/lib/graphql/schema/connect";
import { gqlErrorFirstMessage } from "@muft/dailyfns"
import { useSpinner } from "src/components/atoms/Spinner";
// import PopupChatMessages from 'components/Chat/PopupChatMessages';
import { Loading, LoadingElement } from "src/components/shared/Loading";
type UserProps = {
  social: boolean;
  invite: boolean;
  groupId?: string;
  isConnect?: boolean;
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

const Users: React.FC<UserProps> = (props) => {
  const { social, invite, groupId, isConnect } = props;
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const loadingEl = useRef<LoadingElement>(null);

  const [genres, setGenres] = useState([{ id: "", name: "" }]);
  const [categories, setCategories] = useState([{ id: "", name: "" }]);
  const { register, handleSubmit } = useForm();

  const [showLoadMore, setShowLoadMore] = useState(true);
  const [isAppend, setIsAppend] = useState(true);
  const [reqParam, setReqParam] = useReducer(reducer, {
    filters: [],
    orderBy: [],
    limit: 20,
    offset: 0,
  });

  const { showSpinner, hideSpinner, isSpinning } = useSpinner();

  const requestUsers = ({ filters = [], orderBy = [], limit = 2, offset = 0 }) => {
    showSpinner();
    setShowLoadMore(true);
    getGqlClient()
      .request(usersQuery, {
        filters,
        orderBy,
        limit,
        offset,
      })
      .then((data) => {
        let items = data.users.items;
        // console.log(items);
        if (items.length < reqParam.limit) {
          setShowLoadMore(false);
        }
        if (isAppend) {
          items = [...users, ...items];
        }
        setUsers(items);
        setIsAppend(true);
      })
      .catch((err) => {
        setUsers([]);
        const msg = gqlErrorFirstMessage(err, { capitalize: true });
        console.log(msg);
      })
      .finally(() => {
        hideSpinner();
      });
  };

  useEffect(() => {
    getGqlClient().request(genresQuery).then((data) => setGenres(data.genres));
    getGqlClient().request(categoriesQuery).then((data) => setCategories(data.categories));
    // requestUsers([], [{ key: "id", value: "DESC" }]);
    // requestUsers(reqParam)
  }, []);

  useEffect(() => {
    requestUsers(reqParam);
  }, [JSON.stringify(reqParam)]);

  const handleLoadMore = () => {
    setReqParam({
      offset: reqParam.offset + reqParam.limit,
    });
  };

  const submitHandler: (data) => void = (data) => {
    console.log(data);
    let filters: Array<object> = [];
    let orderBy: Array<object> = [];

    if (data.query) {
      filters.unshift({
        field: "full_name",
        operator: "like",
        value: data.query,
        condition: "OR",
      });
      // filters.unshift({
      //   field: "last_name",
      //   operator: "like",
      //   value: data.query,
      // })
    }

    /* Problem: last_name does not sort as expected. (ASC) */
    if (data.orderBy === "usernameAsc") {
      orderBy = [
        { key: "first_name", value: "ASC" },
        { key: "last_name", value: "ASC" },
      ];
    } else if (data.orderBy === "usernameDesc") {
      orderBy = [
        { key: "first_name", value: "DESC" },
        { key: "last_name", value: "DESC" },
      ];
    } else if (data.orderBy === "newUser") {
      orderBy = [{ key: "id", value: "DESC" }];
    }

    /* Category and Genre Filter works fine on themselves */
    if (data.category) {
      filters.unshift({
        field: "category_ids",
        operator: "&&",
        type: "uuidArray",
        value: data.category,
        condition: "AND",
      });
    }

    if (data.genre) {
      filters.unshift({
        field: "genre_ids",
        operator: "&&",
        type: "uuidArray",
        value: data.genre,
        condition: "AND",
      });
    }

    /* Problem: No Network Filter at the moment */
    console.log("Filters", filters);
    console.log("Order By", orderBy);
    // requestUsers(filters, orderBy);
    setIsAppend(false);
    setReqParam({
      filters,
      orderBy,
      offset: 0,
    });
  };

  const loading = isSpinning();

  return (
    <>
      {!invite && <h5 className='mb-4 fw-bold'>MEMBERS</h5>}

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-group d-flex '>
          <input {...register("query")} className='form-control' placeholder='Search User'></input>
          <button type='submit' className='btn btn-primary mx-2' disabled={loading}>
            Search
          </button>
        </div>
        <Accordion className='my-2'>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <FontAwesomeIcon icon={faList} className='mx-1' /> Advanced Filters
            </Accordion.Header>
            <Accordion.Body>
              <div className='d-flex w-100 align-items-center my-2'>
                <span className='w-50'>Sort Users By:</span>
                <select className='form-select' {...register("orderBy")}>
                  <option value='newUser'>New User First</option>
                  <option value='usernameAsc'>Ascending by name</option>
                  <option value='usernameDesc'>Descending by name</option>
                </select>
              </div>

              <div className='d-flex w-100 align-items-center my-2'>
                <span className='w-50'>Category:</span>
                <select className='form-select' {...register("category")}>
                  <option value=''></option>
                  {categories.map((x, idx) => {
                    return (
                      <option value={x.id} key={idx}>
                        {x.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='d-flex w-100 align-items-center my-2'>
                <span className='w-50'>Genre:</span>
                <select className='form-select' {...register("genre")}>
                  <option value=''></option>
                  {genres.map((x, idx) => {
                    return (
                      <option value={x.id} key={idx}>
                        {x.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='w-100 d-flex justify-content-end'>
                <button className='btn btn-primary px-5' type='submit' disabled={loading}>
                  <FontAwesomeIcon icon={faSearch} /> Search
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </form>

      {users.map((x, idx) => (
        <UserItem isConnect={isConnect} groupId={groupId} userInfo={x} social={social} invite={invite} key={idx} /*  onMessage={messagePopupHandler} */ />
      ))}
      {!loading && users.length === 0 && <h5 className='text-center'>No match found</h5>}

      {showLoadMore ? (
        <div className='text-center my-3'>
          <button className='btn btn-primary' onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Users;
