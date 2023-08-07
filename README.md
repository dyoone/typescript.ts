# typescript.ts
타입스크립트 공부


<제네릭>
재사용성 높은 컴포넌트를 만들 때 사용되며, 한가지 타입보다 여러 타입에서 동작하는 컴포넌트를 생성하는데 사용한다.

함수, 인터페이스 또는 클래스를 선언 할 때 사용자로부터 어떤 타입의 데이터를 받아올지 단정지을 수 없는 경우가 있다. 이럴 때는 함수, 클래스, 인터페이스를 선언하는 시점이 아닌 사용하는 시점에 타입을 동적으로 선언한다.

제네릭을 사용할 때는 타입 변수를 선언하고, 이 타입 변수를 함수나 클래스의 매개변수, 반환 타입, 프로퍼티 등에 사용합니다. 제네릭 타입 변수는 일반적으로 대문자 알파벳 한 글자로 표현되며, 관례적으로 T, U, K 등이 사용된다.

// 함수에서 제네릭 사용
function printArray<T>(arr: T[]): void {
    arr.forEach(item => console.log(item));
}

printArray([1, 2, 3]); // 출력: 1 2 3
printArray(['a', 'b', 'c']); // 출력: a b c

// 클래스에서 제네릭 사용
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

const numberBox = new Box<number>(42);
console.log(numberBox.getValue()); // 출력: 42

const stringBox = new Box<string>('Hello');
console.log(stringBox.getValue()); // 출력: Hello
