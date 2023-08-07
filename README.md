# typescript.ts



### <제네릭>
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

제네릭을 사용함으로써 특정한 타입 또는 타입들의 집합을 제한하고 선택할 수 있다. 이를 통해 원하는 타입으로 함수나 클래스를 호출할 때 타입 안정성을 유지하면서 코드를 유연하게 작성할 수 있다.
```
interface Animal {
    name: string;
}

function printName<T extends Animal>(animal: T): void {
    console.log(animal.name);
}

const dog: Animal = { name: 'Buddy' };
printName(dog); // 출력: Buddy

// 아래 코드는 컴파일 에러를 발생시킵니다.
// printName({ name: 'Whiskers', age: 5 }); // 에러: Animal 인터페이스의 속성인 name만 허용됨
```
