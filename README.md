![basecomponenet](https://github.com/dyoone/typescript.ts/assets/121990995/ea8112fb-b3ac-4ff0-978e-98852d9c05f0)

앞으로 만들 많은 컴포넌트들의 위의 인스턴스트를 따라갈 것이기 때문에 위와 같이 만들었고 인스턴스의 type은 HTMLELEMENT중에 무언가를 사용할 것이기 때문에 제네릭type에서 HTMLELEMENT를 확장하였다.

element는 노출될일 없고 해당 컴포넌트를 상속하는 경우에만 사용하기 때문에 protected와 readonly를 사용했다.

attahcTo는 두 가지 기능을 할 것이다

1.삽입 되어야 하는 영역과 위치를 원하는 곳에 지정해서 렌더시키는 경우

2.dom의 body의 자식으로 들어가는 경우

그래서 전달하는 인자를 활용해서 if문으로 처리하고 parnet인자는 원하는 영역(html요소 중에 어떤 요소를 선택하는지)이기 때문에 type을 HTMLELEMENT로 설정했다.

