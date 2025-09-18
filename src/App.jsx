import { createContext, useEffect, useState, useReducer, useMemo, useCallback, useRef } from 'react'
import {Contents, Reducer} from './components/pages/notice/data';
import './App.css'
//
import { Routes, Route, useNavigate } from 'react-router-dom';
//헤더푸터
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
//리다이렉트
import { RedirectLogin, RedirectMain } from './components/generic/Redirects';
//페이지
import PageMain 		from './components/pages/main/PageMain';
import PageIntro 		from './components/pages/intro/PageIntro';
import PageCourse 		from './components/pages/course/PageCourse';
import PageNotice 		from './components/pages/notice/PageNotice';
import PageFestival 	from './components/pages/festival/PageFestival';
import PageMy 			from './components/pages/my/PageMy';
//디테일&작성&수정페이지
import PageNoticeDetail 	from './components/pages/details/PageNoticeDetail';
import PageNoticeWrite 		from './components/pages/details/PageNoticeWrite';
import PageNoticeEdit 		from './components/pages/details/PageNoticeEdit';
import PageQNADetail 		from './components/pages/details/PageQNADetail';
import PageQNAWrite 		from './components/pages/details/PageQNAWrite';
import PageAnswerWrite 		from './components/pages/details/PageAnswerWrite';
import PageAnswerEdit 		from './components/pages/details/PageAnswerEdit';
import PageFestivalDetail 	from './components/pages/details/PageFestivalDetail';
import PageQNAEdit from './components/pages/details/PageQNAEdit';
import { login, logout } from './api_utils/loginUtil';

const configContext = createContext();

export const dataContext = createContext();
export const editContext = createContext();

function App() {
	//네비게이트
	const navigate = useNavigate();
	
	//전역설정 상태
	const [config, setConfig] = useState({
		user: null,
		festivalView: 'gallery'
	});

	// 개선: 각 기능별로 함수를 분리해서 정의
	
	// 축제 보기 모드 변경 함수
	const handleSetFestivalView = (val) => {
		setConfig(prevConfig => ({
			...prevConfig,
			festivalView: val
		}));
	};

	// 로그인 함수 - 더 간단하게 정리
	const handleLogin = () => {
		login({}, 
			(user) => {
				console.log('로그인 성공:', user);
				setConfig(prevConfig => ({
					...prevConfig,
					user: user
				}));
			},
			(error) => {
				console.error('로그인 실패:', error);
			}
		);
	};

	// 로그아웃 함수 - 더 간단하게 정리
	const handleLogout = () => {
		logout(
			{}, // 빈 데이터
			(response) => {
				// 성공 시 사용자 정보 삭제
				setConfig(prevConfig => ({
					...prevConfig,
					user: null
				}));
			},
			(error) => {
				// 에러 시에도 사용자 정보 삭제 (안전장치)
				setConfig(prevConfig => ({
					...prevConfig,
					user: null
				}));
			},
			() => {
				// 완료 후 메인페이지로 이동
				navigate('/');
			}
		);
	};

	const handleConfig = {
		setFestivalView: handleSetFestivalView,
		login: handleLogin,
		logout: handleLogout
	};

	// notice 
	const [state, dispatch] = useReducer(Reducer, Contents);
	const {datas} = state;
	const {name, title, content} = state.inputs;
	const userId = useRef(21);
  
	const createNotice = useCallback((name, title, content)=>{
	  const today = new Date();
	  const year = today.getFullYear();
	  const month = (today.getMonth()+1).toString().padStart(2, '0');
	  const day = today.getDate().toString().padStart(2, '0');
	  const createDate = year + '-' + month + '-' + day;
  
	  dispatch({
		type: "create",
		data: {
		  name, title, content,
		  id: userId.current,
		  createDate
		}
	  })
	  userId.current += 1;
	}, [name, title, content])
  
	const editNotice = (id, content)=>{
	  dispatch({
		type: "edit",
		id, content
	  })
	}
  
	const removeNotice = (id)=>{
	  dispatch({
		type: "remove",
		id
	  })
	}
  
	const searchNotice = (text)=>{
	  dispatch({
		type: "search",
		text
	  })
	}
  
	const memoNotice = useMemo(()=>{
	  return {createNotice, editNotice, removeNotice, searchNotice}
	}, [])
	//
	return <>
		<configContext.Provider value={config}>
			<dataContext.Provider value={datas}>
				<editContext.Provider value={memoNotice}>
				    <Header handleConfig={handleConfig}/>
			        <Routes>
				        {/*리다이렉트*/}
				        <Route exact path={'/'} element={<RedirectMain/>}/>
				        <Route path={'/redirectLogin/:code'} element={<RedirectLogin/>}/>
				        {/*페이지들*/}
				        <Route path={'/main'} 			element={<PageMain/>}/>
				        <Route path={'/intro/:tabName'} element={<PageIntro/>}/>
				        <Route path={'/course'} element={<PageCourse/>}/>
				        <Route path={'/course/:tabName'} element={<PageCourse/>}/>
				        <Route path={'/notice/:tabName'} element={<PageNotice/>}/>
				        <Route path={'/festival/:tabName'} element={<PageFestival handleConfig={handleConfig}/>}/>
				        <Route path={'/my/:tabName'} element={<PageMy handleConfig={handleConfig}/>}/>
				        {/*상세,작성,수정페이지*/}
				        <Route path={'/notice/detail/:noticeId'} 	element={<PageNoticeDetail/>}/>
				        <Route path={'/notice/write'} 				element={<PageNoticeWrite/>}/>
				        <Route path={'/notice/edit/:noticeId'} 		element={<PageNoticeEdit/>}/>
				        <Route path={'/qna/detail/:qnaId'} 			element={<PageQNADetail/>}/>
				        <Route path={'/qna/edit/:qnaId'} 			element={<PageQNAEdit/>}/>
				        <Route path={'/qna/write'} 					element={<PageQNAWrite/>}/>
				        <Route path={'/answer/write'} 				element={<PageAnswerWrite/>}/>
				        <Route path={'/answer/edit/:answerId'} 		element={<PageAnswerEdit/>}/>
				        <Route path={'/festival/detail/:festivalId'} element={<PageFestivalDetail/>}/>
			        </Routes>
			        <Footer/>
				</editContext.Provider>
			</dataContext.Provider>
		</configContext.Provider>
	</>
}

export { App, configContext }
