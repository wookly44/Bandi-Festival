// 간단한 사용자 상태 관리
let currentUser = null;

// 현재 로그인한 사용자 정보 가져오기
export const getCurrentUser = () => currentUser;

// 더미 로그인 (테스트용) - 콜백 함수들을 매개변수로 받도록 수정
export const login = (data, onSuccess, onError) => {
	try {
		// 실제 API 호출 시뮬레이션을 위한 setTimeout 추가
		setTimeout(() => {
			currentUser = {
				id: 'user123',
				name: '홍길동',
				email: 'test@example.com',
				profileImage: '/bandifesta/assets/user1.png'
			};
			
			// 성공 콜백 실행
			if (onSuccess && typeof onSuccess === 'function') {
				onSuccess(currentUser);
			}
		}, 500); // 0.5초 지연으로 실제 API 호출 시뮬레이션
		
	} catch (error) {
		console.error('로그인 중 오류 발생:', error);
		// 에러 콜백 실행
		if (onError && typeof onError === 'function') {
			onError(error);
		}
	}
};

// 로그아웃 - App.jsx의 패턴에 맞춰 콜백 함수들을 매개변수로 받도록 수정
export const logout = (data, onSuccess, onError, onComplete) => {
	try {
		// 실제 API 호출 시뮬레이션을 위한 setTimeout 추가
		setTimeout(() => {
			currentUser = null;
			console.log('로그아웃 처리 완료');
			
			// 성공 콜백 실행
			if (onSuccess && typeof onSuccess === 'function') {
				onSuccess();
			}
			
			// 완료 콜백 실행
			if (onComplete && typeof onComplete === 'function') {
				onComplete();
			}
		}, 300); // 0.3초 지연
		
	} catch (error) {
		console.error('로그아웃 중 오류 발생:', error);
		// 에러 콜백 실행 (에러가 발생해도 로그아웃 처리)
		if (onError && typeof onError === 'function') {
			onError(error);
		}
		
		// 완료 콜백 실행
		if (onComplete && typeof onComplete === 'function') {
			onComplete();
		}
	}
};