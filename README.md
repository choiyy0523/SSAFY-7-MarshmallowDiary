![image1](assets/image1.jpg)

# 마시멜로 일기

### 당신의 달콤한 감정일기!📒💞

### 마시멜로 일기와 함께 달콤한 하루 기록을 시작하세요! 🍭🍬

[구글 플레이 스토어 링크](https://play.google.com/store/apps/details?id=com.marshmallowdiary)

![image14](assets/image14.jpg)


---
## :scroll: 목차

- [프로젝트 정보](#zero-프로젝트-정보)
- [프로젝트 개요](#one-프로젝트-개요)
- [팀원 소개](#two-팀원-소개)
- [와이어 프레임 및 디자인 컨셉](#three-와이어-프레임-및-디자인-컨셉)
- [ERD](#four-erd)
- [REST API](#five-rest-api)
- [Git 협업 컨벤션](#six-git-협업-컨벤션)
- [기술 스택 및 아키텍쳐](#seven-기술-스택-및-아키텍쳐)
- [파일 구조](#eight-파일-구조)
- [서비스 화면](#nine-서비스-화면)
- [발표 자료](#star2-발표-자료)
- [자료 출처](#star2-자료-출처)
- [개인정보처리방침](#star2-개인정보처리방침)
- [오픈소스 라이센스](#star2-오픈소스-라이센스)





---

## 마시멜로 일기

### :zero: 프로젝트 정보

- 삼성청년SW아카데미(SSAFY) 7기 2학기 자율프로젝트
- 서울 자율 3반 3팀 (A303)
- 진행기간
  - 2022.10.10 ~ 2022.11.21 (총 7주)





---

### :one: 프로젝트 개요

- **Naver CLOVA Sentiment API를 활용한 감정 분석 일기 서비스** :four_leaf_clover:
- 매일 기록한 일기가 어떤 감정들로 구성되어있는지 알려주고, 사용자는 해당 결과를 기반으로 노래를 추천 받을 수 있습니다.
- 직관적이면서도 감성을 살린 귀여운 UI를 통해 사용자 접근성을 높이고 일기 쓰는 즐거움을 더했습니다.
- 감정 분석 레포트를 통해 월별 감정 비율 분석 그래프를 제공합니다.
- 선택한 기간에 작성한 일기 중 가장 긍정적인 감정으로 이루어진 긍정일기로 다시 안내하는 리마인드 기능을 통해, 과거의 일기를 다시보며 추억할 수 있습니다.
- 당일 일기 분석 결과와 레포트를 이미지로 공유하고 저장 가능합니다.
- 원하는 일기를 검색할 수 있는 검색 기능을 제공합니다.
- 개인 프라이버시 보호를 위한 비밀번호 설정 기능을 제공합니다.





---

### :two: 팀원 소개

![image4](assets/image4.png)

#### 7기 서울 자율 3반 A303

| 소개 | 이름   | 개발 담당 파트                              | 산출물 담당 파트                  |
| ---- | ------ | ------------------------------------------- | --------------------------------- |
| 팀장 | 최윤영 | `FE` 일기 작성/조회/분석/추천, 환경설정     | 발표(중간), PPT(중간), README     |
| 팀원 | 김현지 | `BE` 일기 작성/조회, 검색                   | UCC, 포팅매뉴얼                   |
| 팀원 | 박현영 | `BE` 회원가입/로그인, 회원정보 관리         | UCC, 포팅매뉴얼                   |
| 팀원 | 유지슬 | `BE` 일기 분석 및 결과 조회                 | 발표(최종), PPT(최종), 포팅매뉴얼 |
| 팀원 | 이도연 | `BE` 서버 배포 및 테스트 코드 작성          | PPT(최종), 포팅매뉴얼             |
| 팀원 | 전상현 | `FE` 회원가입/로그인, 메인, 분석/통계, 검색 | README                            |




---

### :three: 와이어 프레임 및 디자인 컨셉

- 개발 전 충분한 회의를 거쳐 구현할 핵심 기능 및 캐릭터 디자인, 색상팔레트를 선정하여 추후 개발과정에서 디자인이 크게 변동되어 발생할 수 있는 번거로움과 혼동을 줄였습니다.

> #### 초기 와이어프레임 및 캐릭터 디자인
>
> ![image6](assets/image6.png)

> #### 최종 스토리보드 및 디자인 코드
>
> ![image3](assets/image3.png)
>
> - **Figma 퍼블릭 링크**
>   - https://www.figma.com/file/ZxDkVhHofH1AItO6pzmRNd/A303_public?node-id=0%3A1&t=YSHNI3mXkQWmxDVv-1





---

### :four: ERD

> ![image7](assets/image7.png)





---

### :five: REST API

- 팀 노션 문서를 통해 FE와 BE간의 원활한 확인 및 작업이 가능하도록 했습니다.
- **REST API 퍼블릭 링크**
  - https://www.notion.so/marshmallowdiary/REST-API-1ca16d88bfb94dbfa96ffa39403044a5

> ![image8](assets/image8.png)
>
> ![image9](assets/image9.png)
>
> ![image10](assets/image10.png)





---

### :six: Git 협업 컨벤션

#### 브랜치 명 컨벤션

- `master` -> `develop` -> `front/back` -> `feat`
- 기능별 브랜치 분리가 원칙
- feat보다 상위 브랜치로 merge 진행시 팀원간 상호 확인 필수

#### commit 컨벤션

```text
# type : 제목
# init : 초기 설정 (환경 설정 등)
# feat : 기능 추가
# fix : 버그 수정
# refactor : 리팩토링
# docs : 문서 작업 (문서 추가, 수정, 삭제 등)
# test : 테스트 코드 (테스트 코드 추가, 수정, 삭제)
# chore : 기타 변경사항 (빌드 스크립트 수정 등)
```





---

### :seven: 기술 스택 및 아키텍쳐

> ![image13](assets/image13.png)

> #### 협업툴
>
> |  GitLab   |     Jira      |     Notion     |    Figma    | Mattermost, Webex |
> | :-------: | :-----------: | :------------: | :---------: | :---------------: |
> | 버전 관리 | 프로젝트 관리 | 공용 문서 관리 | 디자인 협업 | 연락 및 화상회의  |
>
> #### FrontEnd - React Native (JavaScript)
>
> | React Native | Node.js | Chocolatey | Android Studio | SDK | VS code |
> | :----------: | :-----: | :--------: | :------------: | :-: | ------- |
> |    0.70.5    | 16.16.0 |   1.2.0    |    Dolphin     | 31  | 1.73.1  |
>
> #### BackEnd - Spring Boot (Java)
>
> |         Java          | SpringBoot Security | Spring Data JPA | Spring Web | Gradle |
> | :-------------------: | :-----------------: | :-------------: | :--------: | :----: |
> | 11.0.17 (corretto-11) |        2.7.5        |        -        |     -      |  7.5   |
>
> | Swagger | QueryDsl | MySQL  | Redis | MongoDB | IntelliJ IDEA |
> | :-----: | :------: | :----: | :---: | :-----: | :-----------: |
> |  2.9.2  |  1.0.10  | 8.0.30 | 5.0.7 | 4.4.17  |   2022.2.2    |
>
> #### Deploy
>
> | AWS EC2 |    AWS S3    |  Ubuntu   | Docker | Jenkins | Nginx |  Xshell  |
> | :-----: | :----------: | :-------: | :----: | :-----: | :---: | :------: |
> | server  | Image server | 20.04 LTS |        |         |       | 7.0.0025 |





---

### :eight: 파일 구조

![image12](assets/image12.png)

- 주요 파일 구조 요약

  - `assets` : `README.md` 사진파일, 발표 pdf파일, 스토어 등록 스크린샷

  - `back`

    ```
    📦back
     ┣ 📂src
     ┃ ┣ 📂main
     ┃ ┃ ┣ 📂java
     ┃ ┃ ┃ ┗ 📂com
     ┃ ┃ ┃ ┃ ┗ 📂marshmallow
     ┃ ┃ ┃ ┃ ┃ ┣ 📂analysis
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AnalysisController.java     		// 감정 분석 controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AnalysisRequest.java      	   	// 감정 분석 결과 응답
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AnalysisResponse.java    	    // 감정 분석 요청
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Analysis.java             	    // 감정 분석 entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AnaylsisRepository.java     		// 감정 분석 repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AnalysisService.java        		// 감정 분석 service
     ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂login
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserDetailsServiceImpl.java  	// 유저 정보를 가져오는 service 구현체
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtFilter.java  					        // 토큰 검증 필터
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtTokenProvider.java       	  	// JWT 토큰 생성
     ┃ ┃ ┃ ┃ ┃ ┣ 📂config
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AwsS3Config.java  				      	// AWS S3 설정
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RedisConfig.java  				      	// 토큰 정보 저장을 위한 Redis 설정
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SecurityConfig.java  		    		// 스프링 시큐리티 설정
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SwaggerConfig.java  		      		// Swagger 설정
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WebConfig.java  				        	// CORS 설정
     ┃ ┃ ┃ ┃ ┃ ┣ 📂diary  
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DiaryController.java  		    	// 일기 controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiaryRequest.java  			    	// 일기 CRD 요청
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiaryResponse.java  			    	// 일기 조회 응답
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiarySearch.java  			      	// 일기 검색 결과 dto
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MainDiaryInfo.java  		    		// 메인 화면의 한 달 감정 조회
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Diary.java 				        		// 일기 entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiaryRepository.java  	    		// 일기 repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DiaryRepositoryImpl.java  	   	// queryDsl을 사용하기 위한 일기 repository 구현체
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AwsS3Service.java  				    // AWS S3 사진 등록 및 조회 서비스
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DiaryService.java  			    	// 일기 CRD 서비스
     ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AlreadyRegistDiary.java  		  	// 이미 등록된 일기 예외
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CanNotRegistDiary.java 		    	// 등록 오류 예외
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜exception.java  				        	// 예외
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜NotFindDiary.java  			       	// 찾을 수 없는 일기 예외
     ┃ ┃ ┃ ┃ ┃ ┣ 📂music
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MusicController.java  		    	// 음악 추천 controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto  
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MusicRequest.java  		    		// 음악 추천 요청
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Music.java  					        	// 음악 추천 entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MusicRepository.java       		// 음악 추천 repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MusicService.java  				    // 음악 추천 service
     ┃ ┃ ┃ ┃ ┃ ┣ 📂user
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.java 				    // 회원가입, 로그인 controller
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRequest.java  			      	// 회원가입, 로그인 요청
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserResponse.java  			    	// 회원가입, 로그인 응답
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜User.java  					        	// 유저 entity
     ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserRepository.java  		    	// 유저 repository
     ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
     ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserService.java  			      	// 유저 service
     ┃ ┃ ┃ ┃ ┃ ┗ 📜MarshmallowApplication.java    		// 메인 애플리케이션
     ┃ ┃ ┗ 📂resources
     ┃ ┃ ┃ ┣ 📜application.properties  				      	// 서버 property 설정
     ┃ ┃ ┃ ┣ 📜negative.csv  					            		// 부정 음악 데이터
     ┃ ┃ ┃ ┣ 📜neutral.csv  					             		// 중립 음악 데이터
     ┃ ┃ ┃ ┗ 📜positive.csv  							            // 긍정 음악 데이터
     ┃ ┗ 📂test                                    		// 테스트 코드
     ┣ 📜.gitignore
     ┣ 📜build.gradle  								              	// 필요 라이브러리 gradle 파일
     ┣ 📜Dockerfile  									                // 자동 배포(빌드)를 위한 dockerfiles
    ```

  - `front`

    ```
    📦front/MarshmallowDiary
     ┣ 📂android
     ┃ ┣ 📂app
     ┃ ┃ ┣ 📂release
     ┃ ┃ ┃ ┗ 📜MarshmallowDiary_221121_master.apk  // 현재 스토어에 배포된 최신 버전 apk 파일
     ┣ 📂src
     ┃ ┣ 📂api                       // Axios url 관리
     ┃ ┃ ┣ 📜http.js
     ┃ ┃ ┗ 📜util.js
     ┃ ┣ 📂assets                   // 이미지, 폰트 등 UI asset
     ┃ ┣ 📂navigations
     ┃ ┃ ┗ 📜Stack.js				        // 페이지 이동 관리
     ┃ ┣ 📂screens
     ┃ ┃ ┣ 📂components
     ┃ ┃ ┃ ┗ 📂component		        // 반복 사용되는 컴포넌트
     ┃ ┃ ┃ ┃ ┣ 📜ChipRed.js			    // 중요 선택 버튼
     ┃ ┃ ┃ ┃ ┣ 📜ChipYellow.js	    // 일반 선택 버튼
     ┃ ┃ ┃ ┃ ┣ 📜Footer.js			    // 화면 하단 배치
     ┃ ┃ ┃ ┃ ┗ 📜Privacy.js			    // 사생활 비밀번호 입력 키패드
     ┃ ┃ ┣ 📂pages
     ┃ ┃ ┃ ┣ 📂Analysis
     ┃ ┃ ┃ ┃ ┗ 📜Analysis.js		    // 전체, 월간 분석 결과 페이지
     ┃ ┃ ┃ ┣ 📂Diary
     ┃ ┃ ┃ ┃ ┣ 📜Detail.js			    // 일기 상세 조회 페이지
     ┃ ┃ ┃ ┃ ┣ 📜OpenUrl.js         // 개인정보처리방침, 오픈소스 라이센스 문서, 유튜브 등의 url 이동 함수
     ┃ ┃ ┃ ┃ ┣ 📜Register.js		    // 일기 작성 페이지
     ┃ ┃ ┃ ┃ ┣ 📜Today.js			      // 하루 일기 분석 조회 페이지
     ┃ ┃ ┃ ┃ ┗ 📜WeatherPicker.js	  // 일기 작성 페이지의 날씨 이미지 변경 모달
     ┃ ┃ ┃ ┣ 📂LocalLogin
     ┃ ┃ ┃ ┃ ┣ 📜LocalLogin.js		  // 로컬 로그인 페이지
     ┃ ┃ ┃ ┃ ┗ 📜SignUp.js			    // 로컬 회원가입 페이지
     ┃ ┃ ┃ ┣ 📂Login
     ┃ ┃ ┃ ┃ ┣ 📜LoginCheck.js		  // 토큰 유무 확인하여 로그인 상태를 판별해주는 함수
     ┃ ┃ ┃ ┣ 📂Main
     ┃ ┃ ┃ ┃ ┣ 📜Calendar.js		    // 메인 화면의 달력 컴포넌트
     ┃ ┃ ┃ ┃ ┗ 📜Main.js			      // 메인 화면 페이지
     ┃ ┃ ┃ ┣ 📂Search
     ┃ ┃ ┃ ┃ ┣ 📜Pagination.js		  // 서치 결과 페이지네이션 컴포넌트
     ┃ ┃ ┃ ┃ ┣ 📜Result.js			    // 서치 결과 페이지
     ┃ ┃ ┃ ┃ ┗ 📜Search.js			    // 서치 키워드 입력 페이지
     ┃ ┃ ┃ ┗ 📂Settings
     ┃ ┃ ┃ ┃ ┣ 📜FAQ.js				      // 자주 묻는 질문 페이지
     ┃ ┃ ┃ ┃ ┣ 📜PwCheck.js			    // 사생활 비밀번호 일치 확인
     ┃ ┃ ┃ ┃ ┣ 📜PwReset.js			    // 사생활 비밀번호 리셋
     ┃ ┃ ┃ ┃ ┣ 📜PwSet.js			      // 사생활 비밀번호 설정
     ┃ ┃ ┃ ┃ ┣ 📜ResetCheck.js	 	  // 사생활 비밀번호 변경시 기존 비밀번호 일치 확인
     ┃ ┃ ┃ ┃ ┣ 📜Settings.js		    // 환경설정 페이지
     ┃ ┗ 📜App.js
    ```

  - `jenkins`

    ```
    📦jenkins
     ┗ 📜backend-dev.jenkinsfile    // 젠킨스 배포 관련 설정
    ```




---

### :nine: 서비스 화면


> #### 1. 회원가입 및 로그인
>
> ![회원가입로그인](assets/회원가입로그인.gif)
>
> - 아이디와 비밀번호만 입력하면 쉽고 빠르게 회원가입 할 수 있습니다.
> - 기존회원의 경우 자동으로 로그인이 됩니다.



> #### 2. 메인 화면
>
> ![메인화면](assets/메인화면.gif)
>
> - 그 달의 캘린더와 함께, 일기를 작성한 날짜에 대표 감정에 해당하는 마시멜로가 표시됩니다.
> - 일기를 작성한 날짜를 클릭하면 해당 날짜의 일기를 조회할 수 있습니다.
> - 하단 중앙에는 일기 작성 빈도에 따라 3종류의 캐릭터가 등장하며, 메세지와 함께 일기 작성을 독려합니다.
> - 하단 중앙의 캐릭터를 클릭하면 오늘의 일기를 작성하거나 작성한 일기를 조회할 수 있습니다.



> #### 3. 일기 작성
>
> ![일기작성삭제](assets/일기작성삭제.gif)
>
> - 일기는 오늘 날짜로만 작성할 수 있습니다.
> - 일기에는 날씨와 제목, 사진과 내용을 등록할 수 있습니다



> #### 4. 일기 조회
>
> ![일기조회](assets/일기조회.gif)
>
> - 해당 날짜에 작성한 일기의 날씨와 제목, 사진과 내용을 조회할 수 있습니다.
> - 아래의 `분석 결과` 버튼을 통해 감정 분석 결과를 조회할 수 있습니다.



> #### 5. 감정 분석
>
> ![감정분석](assets/감정분석.gif)
>
> - 작성된 일기를 기반으로 일기 작성자의 감정을 분석합니다.
> - 분석한 감정에 따른 노래를 추천하며, 링크 클릭 시 유튜브로 이동됩니다.



> #### 6. 감정 통계
>
> ![감정통계](assets/감정통계.gif)
>
> - 한 달 단위 혹은 전체 기간 동안 작성한 일기의 감정 분석 결과 통계를 확인할 수 있습니다.
> - 해당 기간 중 가장 긍정 수치가 높았던 일기를 다시 볼 수 있는 링크를 제공합니다.



> #### 7. 공유하기
>
> ![공유기능](assets/공유기능.gif)
>
> - 그날의 감정 분석 결과, 전체 통계 그래프를 카카오톡, 메시지, 메일 등 다양한 플랫폼을 통해 이미지로 공유할 수 있습니다.



> #### 8. 검색하기
>
> ![검색](assets/검색.gif)
>
> - 다시 보고 싶은 일기를 키워드로 검색할 수 있습니다.



> #### 9. 비밀번호 설정
>
> ![비밀번호](assets/비밀번호.gif)
>
> - 사생활 보호에 신경 쓰시는 분이라면 추가적인 비밀번호 설정을 통해 프라이버시 보호를 강화할 수 있습니다.





---

## :star2: 발표 자료

### 발표 자료
[서울 3반 A303 발표 자료](https://marshmallowdiary.notion.site/831ec3e1fd7e45d4bc7c1c9c7112d4c5)


### UCC

[서울 3반 A303 UCC](https://marshmallowdiary.notion.site/UCC-d45cf1c59ece41b5ba6bd055b4852134)





---

## :star2: 자료 출처

- `Flaticon` : 각종 아이콘 asset
  - https://www.flaticon.com/authors/freepik
- `폰트`
  - 강원교육모두체 (Bold, Light)
    - https://blog.naver.com/happygwedu/221897547714



---

## :star2: 개인정보처리방침

[개인정보처리방침](https://marshmallowdiary.notion.site/bbb8d3a9a67a4c81b26ba7e224b172c9)



---

## :star2: 오픈소스 라이센스

[오픈소스 라이센스](https://marshmallowdiary.notion.site/1a6a1966970742c7bc1940d7db4144d5)





---

- 이 레포지토리의 파일들은 포트폴리오용이므로 각종 key, 테스트용 사진등이 포함되어 있지 않아 정상 동작은 되지 않습니다. 

- 만약 사용 및 테스트를 희망하신다면 플레이 스토어에서 다운로드 혹은 apk 파일(ver 1.6)(`front\MarshmallowDiary\android\app\release\MarshmallowDiary_221121_master.apk`) 설치 후 테스트 가능합니다.

- apk 파일이나 플레이 스토어의 경우에도, 테스트 시점에 EC2 서버가 만료되었을 경우 정상 동작 하지 않을 수 있습니다. 


---
