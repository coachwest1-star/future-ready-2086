window.FR={
 get(){try{return JSON.parse(localStorage.getItem("futureReady2086"))||{}}catch(e){return{}}},
 save(v){localStorage.setItem("futureReady2086",JSON.stringify(v))},
 patch(v){this.save(Object.assign(this.get(),v))},
 reset(){localStorage.removeItem("futureReady2086")},
 careerNames:{auto:"Transportation",construction:"Construction & Trades",ag:"Agriculture",business:"Business & Entrepreneurship"},
 xp(p){return Number((p||this.get()).xp||0)},
 level(xp){xp=Number(xp||0);return xp>=900?4:xp>=500?3:xp>=200?2:1},
 levelName(n){return ["","Trainee","Apprentice","Technician","Career Specialist"][n]||"Career Specialist"},
 nextXP(n){return [0,200,500,900,900][n]||900},
 award(career,scores){
  let p=this.get(),progress=p.progress||{},old=progress[career],avg=Math.round((scores.technical+scores.ai+scores.verification+scores.judgment)/4);
  let gain=old?Math.max(0,avg-(old.best||0)):Math.round(50+avg);
  scores.best=Math.max(avg,(old&&old.best)||0);scores.attempts=((old&&old.attempts)||0)+1;progress[career]=scores;
  let completed=Object.values(progress).filter(x=>x.best>=70).length,credentials=p.credentials||[];
  const names=this.careerNames;
  if(avg>=80&&!credentials.includes(names[career]+" Work-Ready"))credentials.push(names[career]+" Work-Ready");
  if(completed>=2&&!credentials.includes("Evidence Investigator"))credentials.push("Evidence Investigator");
  if(completed>=4&&!credentials.includes("Future Ready Professional"))credentials.push("Future Ready Professional");
  this.patch({progress,credentials,xp:this.xp(p)+gain});return {gain,avg,level:this.level(this.xp(p)+gain)}
 }
};