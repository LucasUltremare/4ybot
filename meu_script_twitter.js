const needle = require("needle");

const token = "AAAAAAAAAAAAAAAAAAAAADszqgEAAAAAgYfL32sT9aXqgaDFdXigPM5EgjQ%3DnxMJF6hOJTvyCrHOzUmAWWWFijnTSCPmYiEGugbV0s369x5Eas"; // Substitua pelo seu Bearer Token

const endpointURL = "https://api.twitter.com/2/tweets";

async function getRequest(params) {
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2RetweetedByUsersJS",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

async function replyToMentions() {
    const query = "@4yhub";
    const params = {
      q: query,
      tweet: {
        fields: "author_id",
      },
    };
  
    try {
      const response = await getRequest(params);
      console.log("Response:", response);
  
      if (response.data && response.data.length > 0) {
        for (const tweet of response.data) {
          console.log("Processing tweet:", tweet);
  
          const authorId = tweet.author_id;
          const replyText = "Sua mensagem de resposta aqui.";
  
          // Adicione a lógica para criar a resposta ao tweet aqui
          // Certifique-se de incluir o ID do tweet original na solicitação
  
          // Exemplo de como criar uma resposta
          const replyParams = {
            status: replyText,
            in_reply_to_status_id: tweet.id,
          };
  
          // Chame a função para enviar a resposta
          await postReply(replyParams);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar menções:", error);
    }
  }

async function postReply(params) {
  const tweetEndpoint = "https://api.twitter.com/2/tweets";
  const res = await needle("post", tweetEndpoint, params, {
    headers: {
      "User-Agent": "v2RetweetedByUsersJS",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    console.log("Resposta enviada com sucesso!");
  } else {
    console.error("Erro ao enviar resposta:", res.statusCode, res.body);
  }
}

(async () => {
  try {
    await replyToMentions();
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
