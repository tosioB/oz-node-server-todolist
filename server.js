const http = require('http'); // http라는 이름으로 내장되어 있는 모듈을 가져온다.

let todo = [
  // { id: 1, content: '더미데이터' },
  // { id: 2, content: '터미네이터' },
];

// 서버 생성
const server = http.createServer((request, response) => {
  console.log(request.method + '요청이 들어왔어요!')

  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  response.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, DELETE')

  // preflight 요청 처리
  if (request.method === 'OPTIONS') {
    return response.end('요청 보내세요.')
  }

  if (request.method === 'GET') {
    return response.end(JSON.stringify(todo))
  }

  if (request.method === 'POST') {
    let data
    request.on('data', (chunk) => {
      data = chunk.toString();
    })
    request.on('end', () => {
      const newTodo = { id: Number(new Date()), content: data }
      todo.push(newTodo)
    });
    return response.end('Todo가 추가됐습니다.')
  }

  if (request.method === 'PUT') {
    let data
    request.on('data', (chunk) => {
      data = chunk.toString();
    })
    request.on('end', () => {
      const newTodo = JSON.parse(data)
      todo = todo.map(el => {
        if(el.id === newTodo.id) {
          return newTodo
        } else {
          return el
        }
      })
    })
    return response.end('Todo가 수정됐습니다.')
  }

  if (request.method === 'DELETE') {
    let data
    request.on('data', (chunk) => {
      data = chunk.toString();
    })
    request.on('end', () => {
      const id = Number(data)
      todo = todo.filter(el => el.id !== id)
    })
    return response.end('Todo가 삭제됐습니다.')
  }

  return response.end('end!')
})

server.listen(3000, () => {
  console.log('3000번 서버가 열림');
});

/**
 * 1. require('http')
 * Node.js의 내장 모듈인 http를 가져옵니다. 이 모듈은 HTTP 서버와 클라이언트 기능을 제공합니다.
 * 
 * 2. let todo = []
 * todo라는 빈 배열을 생성합니다. 이 배열은 TODO 항목들을 저장하는 데 사용됩니다.
 * 
 * 3. http.createServer(callback)
 * HTTP 서버를 생성하는 함수입니다. callback은 클라이언트의 요청이 들어올 때 호출되는 함수로, request와 response 객체를 매개변수로 받습니다.
 * 
 * 4. request.method
 * 클라이언트가 요청한 HTTP 메서드(GET, POST, PUT, DELETE 등)를 나타내는 문자열을 반환합니다.
 * 
 * 5. response.setHeader(name, value)
 * HTTP 응답의 헤더를 설정합니다. 여기서는 CORS (Cross-Origin Resource Sharing)를 허용하기 위해 Access-Control-Allow-Origin과 Access-Control-Allow-Methods 헤더를 설정합니다.
 * 
 * 6. response.end([data])
 * HTTP 응답을 종료합니다. 선택적으로 응답 데이터(data)를 포함할 수 있습니다. 데이터는 클라이언트에 전송됩니다.
 * 
 * 7. request.on('data', callback)
 * 요청 본문에서 데이터를 수신할 때마다 호출되는 이벤트 리스너입니다. 데이터가 청크 단위로 들어오면, 이 콜백이 호출됩니다.
 * 
 * 8. request.on('end', callback)
 * 요청 본문을 모두 읽은 후 호출되는 이벤트 리스너입니다. 요청 본문 수신이 완료되면 이 콜백이 호출됩니다.
 * 
 * 9. server.listen(port, [callback])
 * 서버를 지정된 포트(port)에서 수신 대기하도록 설정합니다. 선택적으로 서버가 시작되면 호출될 콜백 함수(callback)를 받을 수 있습니다.
 */

/** 각 HTTP 메서드에 대한 처리
 * OPTIONS
 * 클라이언트가 서버에 대해 지원하는 메서드나 다른 CORS 관련 정보를 요청할 때 사용하는 HTTP 메서드입니다. 이 코드에서는 프리플라이트 요청을 처리하여 클라이언트가 서버와의 교차 출처 요청을 할 수 있도록 합니다.
 * 
 * GET
 * 서버에서 TODO 항목들을 요청할 때 사용하는 메서드입니다. todo 배열을 JSON 문자열로 변환하여 클라이언트에 응답합니다.

 * POST
 * 클라이언트가 새로운 TODO 항목을 서버에 추가할 때 사용하는 메서드입니다. 요청 본문에서 데이터를 읽어와서 새로운 TODO 항목을 생성하고 todo 배열에 추가합니다. 클라이언트에 성공 메시지를 응답합니다.

 * PUT
 * 클라이언트가 기존의 TODO 항목을 수정할 때 사용하는 메서드입니다. 요청 본문에서 수정할 TODO 항목의 데이터를 읽어와서 기존 TODO 항목을 찾아 수정합니다. 클라이언트에 성공 메시지를 응답합니다.

 * DELETE
 * 클라이언트가 특정 TODO 항목을 삭제할 때 사용하는 메서드입니다. 요청 본문에서 삭제할 항목의 ID를 읽어와서 todo 배열에서 해당 항목을 필터링하여 제거합니다. 클라이언트에 성공 메시지를 응답합니다.
 */

/** 코드 실행 및 로그
 * 서버 시작: server.listen(3000, () => { console.log('서버가 열림'); }); 이 줄은 서버가 포트 3000에서 요청을 수신하기 시작하며, 서버가 시작되었다는 메시지를 콘솔에 출력합니다.
 */
