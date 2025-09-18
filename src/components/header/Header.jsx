import { Link } from 'react-router-dom';
import './header.css';
import './mymenu.css';
import { useContext, useState } from 'react';
import GenericIconButton from '../generic/GenericIconButton';
import { configContext } from '../../App';

function MyMenu({ handleConfig }) {
	const config = useContext(configContext);
	const [visible, setVisible] = useState(false);
	
	// 메뉴 표시/숨김 토글 핸들러
	const toggleVisible = () => setVisible(!visible);
	const hideMenu = () => setVisible(false);

	// 로그인 상태 확인
	const isLoggedIn = config.user !== null;

	return <>
		<a className='myMenuButton' href='javascript:void(0);' onClick={toggleVisible}></a>
		<div className={`myMenuContainerWrapper${visible ? ' active' : ''}`}>
			<div className='myMenuContainer'>
				{!isLoggedIn
					? <>
						{/* 로그인되지 않은 상태 */}
						<div className='myMenuTop'>
							<div className='title fontSubTitle'>로그인</div>
							<div className='close' onClick={hideMenu}></div>
						</div>
						<div className='text fontMain'>
							더 나은 서비스를 위해<br/>로그인 해주시기 바랍니다.
						</div>
						<GenericIconButton 
							className='kakao' 
							src="/bandifesta/assets/kakao.png" 
							onClick={() => {
								handleConfig.login();
								alert('로그인에 성공했습니다 :)');
							}}>
							카카오로 로그인
						</GenericIconButton>
					</>
					: <>
						{/* 로그인된 상태 */}
						<div className='myMenuTop'>
							<div className='title fontSubTitle'>계정</div>
							<div className='close' onClick={hideMenu}></div>
						</div>
						{/* 마이페이지 서비스 내비게이션 */}
						<div className='serviceNav'>
							<Link to={'/my/info'} onClick={hideMenu}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/user2.png" alt='회원 정보'/>
									<div className='title fontMain'>회원 정보</div>
									<div className='arrow'></div>
								</div>
							</Link>
							<Link to={'/my/favorites'} onClick={hideMenu}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/heartFill.png" alt='찜한 목록'/>
									<div className='title fontMain'>찜한 목록</div>
									<div className='arrow'></div>
								</div>
							</Link>
							<Link to={'/my/qna'} onClick={hideMenu}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/question2.png" alt='1:1 문의'/>
									<div className='title fontMain'>1:1 문의</div>
									<div className='arrow'></div>
								</div>
							</Link>
						</div>
					</>
				}
				
				{/* 공통 서비스 내비게이션 */}
				<div className='myMenuTop'>
					<div className='title fontSubTitle'>서비스</div>
				</div>
				<div className='serviceNav'>
					<Link to={'/intro/main'} onClick={hideMenu}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/ballon.png" alt='경복궁별빛야행'/>
							<div className='title fontMain'>경복궁별빛야행</div>
							<div className='arrow'></div>
						</div>
					</Link>
					<Link to={'/course/min40'} onClick={hideMenu}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/shoes.png" alt='경복궁나들이'/>
							<div className='title fontMain'>경복궁나들이</div>
							<div className='arrow'></div>
						</div>
					</Link>
					<Link to={'/notice/main'} onClick={hideMenu}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/notice.png" alt='알려드립니다'/>
							<div className='title fontMain'>알려드립니다</div>
							<div className='arrow'></div>
						</div>
					</Link>
					<Link to={'/festival/gallery'} onClick={hideMenu}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/location.png" alt='축제둘러보기'/>
							<div className='title fontMain'>축제둘러보기</div>
							<div className='arrow'></div>
						</div>
					</Link>
				</div>
				
				{/* 로그아웃 버튼 (로그인된 경우에만 표시) */}
				{isLoggedIn && (
					<div className='logoutContainer'>
						<div className='logout' onClick={() => {
							handleConfig.logout();
							alert('이용해 주셔서 감사합니다 :)');
							hideMenu(); // 로그아웃 후 메뉴 닫기
						}}>
							로그아웃
						</div>
					</div>
				)}
			</div>
		</div>
	</>
}

function SubMenu({ displaySubMenu, setDisplaySubMenu }) {
	return (
	<div className={`subMenu${displaySubMenu ? '' : ' hidden'}`} 
		onMouseLeave={() => setDisplaySubMenu(false)}>
		
		{/* 경복궁별빛야행 서브메뉴 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/intro/main'} onClick={() => setDisplaySubMenu(false)}>
				행사 소개
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/intro/preservation'} onClick={() => setDisplaySubMenu(false)}>
				예매 안내
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/intro/location'} onClick={() => setDisplaySubMenu(false)}>
				오시는 길
			</Link>
		</div>
		
		{/* 경복궁나들이 서브메뉴 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/course/min40'} onClick={() => setDisplaySubMenu(false)}>
				아이와 함께
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/course/min60'} onClick={() => setDisplaySubMenu(false)}>
				가족과 함께
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/course/min90'} onClick={() => setDisplaySubMenu(false)}>
				연인과 함께
			</Link>
		</div>
		
		{/* 알려드립니다 서브메뉴 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/notice/main'} onClick={() => setDisplaySubMenu(false)}>
				공지사항
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/notice/faq'} onClick={() => setDisplaySubMenu(false)}>
				자주하는 질문
			</Link>
		</div>
		
		{/* 축제둘러보기 서브메뉴 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/festival/gallery'} onClick={() => setDisplaySubMenu(false)}>
				전체보기
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/festival/schedule'} onClick={() => setDisplaySubMenu(false)}>
				달력으로 보기
			</Link>
		</div>
	</div>
	)
}

// handleConfig를 매개변수로 받도록 수정
export default function Header({ handleConfig }) {
	const [displaySubMenu, setDisplaySubMenu] = useState(false);

	return <>
		<header>
			<Link to={'/main'} className='headerLogo'>
				<img src='/bandifesta/assets/logo1.png' alt='대한민국 밤산책 로고'/>
			</Link>
			
			<div className='headerMiddleNav'>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/intro/main'}
					onMouseEnter={() => setDisplaySubMenu(true)}>
					경복궁별빛야행
				</Link>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/course/min40'}
					onMouseEnter={() => setDisplaySubMenu(true)}>
					경복궁나들이
				</Link>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/notice/main'}
					onMouseEnter={() => setDisplaySubMenu(true)}>
					알려드립니다
				</Link>
				<Link 
					className={'navItem fontSubTitle active'} 
					to={'/festival/gallery'}
					onMouseEnter={() => setDisplaySubMenu(true)}>
					축제둘러보기
				</Link>
			</div>
			<MyMenu handleConfig={handleConfig} />
		</header>
		<SubMenu displaySubMenu={displaySubMenu} setDisplaySubMenu={setDisplaySubMenu}/>
	</>
}