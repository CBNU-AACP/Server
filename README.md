# AACP


## 간단한 git 메뉴얼


* 브랜치 생성 
"git branch [브랜치 이름]" 을 해도 되지만 아래 방법을 추천
※브랜치 이름은  Kebab 표현법으로 하도록 하자 ( ex main-page, front-color )
```Linux 
$ git checkout -b [브랜치 이름]
```


* git add
"git add ." 대신에 어떤 일의 단위로 묶기 ( 나중에 comment 달 때에 힘들어지기 때문에 )
ex) 내가 main page의 버튼의 style을 바꾸는 작업을 하면서 style.html과 MainActivity를 건드렸다면 
아래 예시와 같이 2개만 add하고 commit하는 것이 다른 사람들이 보기에도 편해진다
```Linux
$ git add style.html MainActivity
```


* git commit
commit은 위에서 말한 일의 단위로 묶어서 바로 commit을 날려주는 것이 좋다. 그리고 만약에 issue에 묶을 때는 아래 예시와 같이 하면 된다.
※commit message는 영어로 해도 되지만 우리끼리 보고 빠르게 피드백하기위해 한글을 권장
```Linux
$ git commit -m "#[이슈번호] 메인 페이지의 버튼 style을 변경"
```


* git push
현재 master브랜치는 테스트와 작업이 완료된 즉 바로 배포해도 괜찮은 파일들만이 존재하는 곳이다. 그러니까 **master가 아닌 따로 브랜치를 만들어서 pull request를 날리거나** 급한 상황이면 모든 팀원들에게 말하고 master 브랜치에 push하도록 한다.
```Linux
$ git push origin [자신의 브랜치]
```


* pull request (pr) 보내기
본인의 브랜치에 push했다면 github 페이지에서 자신의 branch에 들어갔을 시에 상단에 초록색 pull request 박스가 보일 것이다. 그러면 그것을 클릭하고 message 만들어서 git pull request하면 된다. 그리고 팀원들에게 merge할 것을 얘기하고 merge를 진행하면 된다. 현재 자신이 맡은 일이 마무리가 되었다고 판단되면 merge 시에 기존 브랜치를 삭제한다.
※[pull request message 튜토리얼]( https://www.pullrequest.com/blog/writing-a-great-pull-request-description/ )

* test
