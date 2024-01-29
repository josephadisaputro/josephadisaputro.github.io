$(document).ready(function() {
    startTime();
    startCalendar();
    $('#submitpassword').click(function() {
        var password = 'ihireyusuf';
        var inputPassword = $('.input-password').val();
        if (password === inputPassword) {
            $('.password-request').remove();
        } else {
            var failedAlert = $('<div/>', {
                'class': 'failed-alert',
                'text': 'Password does not match!'
            });
            $('.password-request').append(failedAlert);
        }
    });
});

document.querySelector('.input-password').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var password = 'ihireyusuf';
        var inputPassword = $('.input-password').val();
        if (password === inputPassword) {
            $('.password-request').remove();
        } else {
            var failedAlert = $('<div/>', {
                'class': 'failed-alert',
                'text': 'Password does not match!'
            });
            $('.password-request').append(failedAlert);
        }
    }
});

document.querySelector('.toggle-password').addEventListener('click', function(e) {
    var passwordInput = document.querySelector('.input-password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
});

function sendMessage() {
    $.ajax({
        url: 'https://api.ipify.org?format=jsonp',
        dataType: 'jsonp',
        success: function(data) {
            let ip = data.ip;
            let message = "Hi Yusuf, I would like to ask for your permission to access your portfolio on github, please help give me the password to enter your portfolio. \n\nIP address: " + ip + "\n\nThank you";
            let encodedMessage = encodeURIComponent(message);
            let phoneNumber = "081297698374";
            window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        }
    });
}

function expandTab(element){
    if($(element).closest('.tab').hasClass(`expanded`)){
        $(element).closest('.tab').removeClass(`expanded`);
        $('.footer').removeClass(`shrinked`);
    }else{
        $(element).closest('.tab').addClass(`expanded`);
        $('.footer').addClass(`shrinked`);
    }
}

function closeTab(element){
    $(`.body .tab`).css(`visibility`, `hidden`);
    $(`.action-app`).removeClass(`active`);
    if($(element).closest('.tab').hasClass(`expanded`)){
        $(element).closest('.tab').removeClass(`expanded`);
        $('.footer').removeClass(`shrinked`);
    }
}

function openMenu(element){
    $(`.action-app`).removeClass(`active`);
    $(element).addClass(`active`);
    let text = $(element).find('.icon-name').text();
    $(`.body .tab`).css(`visibility`, `visible`);
    if(text.toLowerCase() == 'about'){
        renderAbout();
    }else if(text.toLowerCase() == 'education'){
        renderEducation();
    }else if(text.toLowerCase() == 'skills'){
        renderSkills()
    }else if(text.toLowerCase() == 'projects'){
        renderProjects()
    }
}

$('.container-image').on('contextmenu', function(e) {
    return false;
});

$('.password-request').on('contextmenu', function(e) {
    return false;
});

$('.body-tab').on('contextmenu', function(e) {
    return false;
});

function startCalendar() {
    const today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    y = checkTime(y);
    m = checkTime(m);
    d = checkTime(d);
    $('.live_date').html(y + "-" + m + "-" + d);
    setTimeout(startTime, 15000);
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    $('.live_clock').html(h + ":" + m + ":" + s + " " + ampm);

    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function renderSkills() {
    const skills = [
        ['nodejs', 'springboot', 'laravel', 'golang', 'eiffel', 'cprogramming'],
        ['mysql', 'postgre', 'mssql', 'oracle'],
        ['jira', 'clickup'],
        ['figma', 'excel', 'worddoc']
    ];

    $('.body-tab').empty();
    const collectionOfSkills = $('<div>').addClass('collection-of-skills');
    $('.body-tab').append(collectionOfSkills);

    let delay = 0; // initial delay
    const delayIncrement = 200; // delay increment for each append

    skills.forEach((skillGroup, index) => {
        const subCollectionOfSkills = $('<div>').addClass(`subcollection-of-skills grid${index + 1}`);
        collectionOfSkills.append(subCollectionOfSkills);

        skillGroup.forEach(skill => {
            setTimeout(() => {
                const skillDiv = $('<div>').addClass(`skill ${skill}`);
                subCollectionOfSkills.append(skillDiv);
            }, delay);
            delay += delayIncrement;
        });
    });
}

function renderEducation(){
    $(`.body-tab`).empty();
    $(`.body-tab`).append(`
        <div class="card container">
            <div class="card scrollable york">
                <div class="card study-details">
                    <div class="card logo">
                        <img src="./York-University-logo.jpeg"/>
                    </div>
                    <div class="card story-study-details">
                        <div class="title">Bachelor of Arts in Computer Science</div>
                        <div class="subtitle">Sept 2015 - 2019</div>
                    </div>
                </div>
            </div>
            <div class="card scrollable carleton">
                <div class="card study-details">
                    <div class="card logo">
                        <img src="./carleton-logo.png"/>
                    </div>
                    <div class="card story-study-details">
                        <div class="title"> Bachelor of Math in Game Development</div>
                        <div class="subtitle">Sept 2014 - 2015</div>
                    </div>
                </div>
            </div>
            <div class="card scrollable cic">
                <div class="card study-details">
                    <div class="card logo">
                        <img src="./CIC_logo.png"/>
                    </div>
                    <div class="card story-study-details">
                        <div class="title">Columbia International College</div>
                        <div class="subtitle">High School</div>
                        <div class="subtitle">Sept 2012 - 2014</div>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function renderAbout(){
    $(`.body-tab`).empty();
    $(`.body-tab`).append(`
        <div class="card headline">
            <div class="card pp">
                <img id="pp" class="image" src="./pp.jpeg"/> 
            </div>
            <div class="card summary" id="personal-summary">
                <table>
                    <tr>
                        <td class="right">Email</td>
                        <td class="left"><a href="mailto:yusuf_adisaputro@hotmail.com">yusuf_adisaputro@hotmail.com</a></td>
                    </tr>
                    <tr>
                        <td class="right">Phone number</td>
                        <td class="left"><a href="https://wa.me/6281297698374?text=Hi%20Yusuf%20Adisaputro!%20I%20have%20read%20your%20profile%20and%20am%20interested%20in%20giving%20you%20an%20interview">+62 812-9769-8374</a></td>
                    </tr>
                    <tr>
                        <td class="right">Date of birth</td>
                        <td class="left">25 September 1996</td>
                    </tr>
                    <tr>
                        <td class="right">Residence address</td>
                        <td class="left">Gading Serpong, Kab. Tangerang Selatan</td>
                    </tr>
                    <tr>
                        <td class="right">Github</td>
                        <td class="left"><a href="https://github.com/josephadisaputro">https://github.com/josephadisaputro</a></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="card stories">
            <div class="card life-line">
                <div class="line"></div>
                <div class="ball">Now</div>
            </div>
            <div class="card line-details">
                <div class="title">
                    PT ITC Auto Multi Finance
                </div>
                <div class="subtitle">
                    Head of Initiative Development (November 2022 – Now)
                </div>
                <div class="story">
                    Established in 2018, PayKu is a distinguished financing company specialising in mobile and
                    smartphone financing. The company operates under the management of PT ITC Auto Multi Finance,
                    also known as IAF Multi Finance. PayKu offers its clients instalment financing services, with down
                    payments commencing from as low as 10%. Notably, the company does not impose late fees and
                    operates without the need for credit cards. All operations and services are conducted in compliance
                    with the regulations set forth by the Financial Services Authority (OJK).&nbsp;<div><br></div><div>&nbsp;Job Responsibilities:&nbsp;</div><div><br></div><div>&nbsp;1. Assume the role of Product Owner and Project Manager for the development of mobile and
                    web applications, catering to both customer and internal requirements.&nbsp;</div><div><br></div><div>&nbsp;2. Ensure all developments are in compliance with the regulations of the Financial Services
                    Authority (OJK).&nbsp;</div><div><br></div><div>&nbsp;3. Exhibit initiative in IT and product development, specifically for PayKu and PayKu Premium.&nbsp;</div><div><br></div><div>&nbsp;4. Manage teams and projects effectively, creating comprehensive roadmaps for all undertaken
                    projects.&nbsp;</div><div><br></div><div>&nbsp;5. Conduct research to identify potential improvements in product offerings, financial services,
                    and IT-related developments.&nbsp;</div><div><br></div><div>&nbsp;6. Collaborate with the Scrum Master to ensure successful project delivery.&nbsp;</div><div><br></div><div>&nbsp;7. Work closely with client relations teams to foster innovation and develop new products.
                </div></div>
            </div>
        </div>
        <div class="card stories">
            <div class="card life-line">
                <div class="line"></div>
                <div class="ball">Oct 2022</div>
            </div>
            <div class="card line-details">
                <div class="title">
                    INFT Singapore Pte. Ltd.
                </div>
                <div class="subtitle">
                    Senior Back End Engineer and Team Lead (PMO) (January 2021 - End of October 2022)
                </div>
                <div class="story">
                    INFT.co, based in Singapore, is a distinguished provider of financial technology services, catering to
                    both the Singaporean and Malaysian markets. The company has developed a web application and a
                    modular online mobile application designed to streamline financial and accounting processes. These
                    applications facilitate efficient management of expenses, local and international money transfers,
                    loans, invoices, among other financial operations.&nbsp;<div><br></div><div>&nbsp;Job Responsibilities:&nbsp;</div><div><br></div><div>&nbsp;1. Serve as the Scrum Master, presenting the vision and user stories from product owners to
                    the entire Scrum team.&nbsp;</div><div><br></div><div>&nbsp;2. Implement feature upgrades as requested by product owners.&nbsp;</div><div><br></div><div>&nbsp;3. Coordinate with vendors for code integration and implementation.&nbsp;</div><div><br></div><div>&nbsp;4. Assist the team in resolving any difficulties encountered.&nbsp;</div><div><br></div><div>&nbsp;5. Host daily stand-ups, conduct necessary technical meetings, and plan for upcoming sprints.&nbsp;</div><div><br></div><div>&nbsp;6. Manage sprint logs effectively.&nbsp;</div><div><br></div><div>&nbsp;7. Collaborate with product owners to design improved workflows for technical
                    implementations.&nbsp;</div><div><br></div><div>&nbsp;8. Address client-deployed issues as they arise.&nbsp;</div><div><br></div><div>&nbsp;9. Liaise with third-party vendors, including those from Thailand, to facilitate developments and
                    expansions.&nbsp;</div><div><br></div><div>&nbsp;10. Provide product owners with development time estimates for each sprint.    
                </div></div>
            </div>
        </div>
        <div class="card stories">
            <div class="card life-line">
                <div class="line"></div>
                <div class="ball">Dec 2020</div>
            </div>
            <div class="card line-details">
                <div class="title">
                    PT Vantsing International Group (PT Solusi Digital Internusa)
                </div>
                <div class="subtitle">
                    IT Manager (January 2020 - December 2020)
                </div>
                <div class="story">
                    <div><span style="font-size: 2vh;">I commenced my journey as an IT Supervisor and Senior Developer for an e-commerce project, which
                    encompassed the development of Mobile, Website, and ERP Systems. My commitment and
                    proficiency led to my promotion as the IT Manager for the entire project, overseeing two teams
                    based in Indonesia and China. The development phase was successfully completed, passing the User
                    Acceptance Testing (UAT), and is currently operational.&nbsp;</span><br></div><div><br></div><div>In my capacity as an IT Manager and Senior Developer, my responsibilities extended beyond the
                    realms of development structure, technical diagrams, permissions, documentation, presentation,
                    and reporting. I also actively participated in coding alongside my team.&nbsp;</div><div><br></div><div>Given the location of the company's head office in China, I was entrusted with an expanded scope of
                    work and promoted to the position of Vice General Manager. This promotion was a testament to
                    their confidence in my ability to contribute to marketing and business analysis required for the
                    e-commerce sector in the Indonesian market, as well as manage the team in Indonesia effectively.&nbsp;<div><br></div><div>&nbsp;Job Responsibilities:&nbsp;</div><div><br></div><div>&nbsp;1. Oversee three development projects encompassing ERP systems, Mobile App, and Website
                    development.&nbsp;</div><div><br></div><div>&nbsp;2. Manage the ERP system for key business processes such as sales, invoices, products, etc.&nbsp;</div><div><br></div><div>&nbsp;3. Provide the technical structure, security planning, workflow, and UI flow for Mobile and Web
                    applications.&nbsp;</div><div><br></div><div>&nbsp;4. Ensure successful completion of testing stages (SIT, UAT, Production).&nbsp;</div><div><br></div><div>&nbsp;5. Set up essential tools including git repository, test server, and accepted automation testing
                    tools.&nbsp;</div><div><br></div><div>&nbsp;6. Handle third-party API integration such as Tiki, BCA VA, Midtrans.&nbsp;</div><div><br></div><div>&nbsp;7. Collaborate with the team to develop and code front-end and back-end using Node.js
                    (Express), React, and Vanilla JS.&nbsp;</div><div><br></div><div>&nbsp;8. Act as the Product Owner to achieve the target vision and mission.    
                </div></div></div>
            </div>
        </div>
    `)
}

function renderProjects(){
    $(`.body-tab`).empty();
    $(`.body-tab`).append(`
        <div class="folders">
            <div class="folder-header">PT. ITC Auto Multi Finance</div>
            <div class="grouped">
                <div class="card">
                    <div class="image">
                        <img src="./empower-mobile.png">
                    </div>
                    <div class="title">
                        Empower Mobile App
                    </div>
                    <div class="description">
                        The Empower Mobile Application signifies the commencement of my project portfolio at PT ITC Auto Multi Finance, primarily aimed at diminishing operational expenses (OPEX). In the erstwhile system, sales counters were burdened with laptops, an expensive and unwieldy solution, to gain access to our backend site, Empower Web. This platform served as a sales counter tool, facilitating customers in securing new loans for smartphone purchases or processing loan applications submitted via PayKu Mobile. This process has been streamlined and simplified with the introduction of the Empower Mobile App.
                        <br>
                        The interaction between sales counters and customers is very important, particularly during the credit calculation phase prior to contract finalization, a critical juncture for us, which this stage is now managed within the Empower Mobile App. Furthermore, the installation procedure for Mobile Device Management (MDM) on Empower Web has been simplified for easier utilization by sales counters via the Empower Mobile App.
                    </div>
                </div>
                <div class="card">
                    <div class="image">
                        <img src="./payku premium app 2.jpg">
                    </div>
                    <div class="title">
                        PayKu Premium App
                    </div>
                    <div class="description">
                        Following meticulous consultations with our Risk and Product departments, we have reached the consensus that the potential growth of the retail market may not be sufficient to counterbalance the negative impact of our current receivables’ aging. Consequently, we have developed the PayKu Premium program. Originally designed for the B2B2E market, we identified a unique opportunity to tailor an application specifically for this purpose.
                    </div>
                </div>
                <div class="card">
                    <div class="image">
                        <img src="./empower web.png">
                    </div>
                    <div class="title">
                        Empower Web
                    </div>
                    <div class="description">
                        Empower Web has been, and continues to be, an integral tool utilized by internal team of PT ITC Auto Multi Finance. It serves various departments, ranging from acquisitions to finance and accounting. This platform is the primary collection and processing point for all new credit applications. However, it is important to clarify that Empower Web does not function as a Loan Management System. Instead, it acts as a conduit to our existing loan management system namely Confins, where details of installments and payment histories are documented.
                    </div>
                </div>
            </div>
        </div>
        <div class="folders">
            <div class="folder-header">Inft.co</div>
            <div class="grouped">
                <div class="card">
                    <div class="image">
                        <img src="./inft.png">
                    </div>
                    <div class="title">
                        https://app.inft.co/
                    </div>
                    <div class="description">
                        Inft.co is a comprehensive digital platform, accessible via web and mobile applications on both Android and iOS. It is designed to cater to the needs of B2B clients, offering them the ability to apply for business loans seamlessly.
                        <br><br>
                        In addition to loan services, Inft.co provides an array of features to facilitate day-to-day business management. These include the creation of new Virtual Account (VA) and sub-VA accounts, which can be utilized for monthly auto-debit and standard purchases in Singapore and Malaysia.
                        <br><br>
                        Moreover, Inft.co offers cross-border money transfer services, enabling transactions within Singapore, as well as to Malaysia and Australia.
                        <br><br>
                        One of the standout features of Inft.co is its debt and receivables invoice management system. This feature allows customers to send receivables invoices directly from the web application to their clients via email, thereby streamlining the payment process. This system also supports QR payments, further enhancing its convenience and efficiency.
                    </div>
                </div>
            </div>
        </div>
        <div class="folders">
            <div class="folder-header">Vantsing International Group</div>
            <div class="grouped">
                <div class="card">
                    <div class="image">
                        <img src="./vantsing.jpg">
                    </div>
                    <div class="title">
                        Vantsing
                    </div>
                    <div class="description">
                        At Vantsing International Group, my initial assignment involved the development of a comprehensive Enterprise Resource Planning (ERP) system. This sophisticated platform was engineered to streamline a multitude of operations including, but not limited to, management of purchase orders, sales orders, delivery orders, invoices, returned goods, warehouse operations, customer relations, and inventory. This project served as a significant milestone in my professional journey, providing a robust foundation for my future endeavors.
                    </div>
                </div>
                <div class="card">
                    <div class="image">
                        <img src="./soldays.png">
                    </div>
                    <div class="title">
                        Soldays
                    </div>
                    <div class="description">
                        Soldays represented the second significant project entrusted to me, marking a pivotal shift in strategic direction. Consequently, my responsibilities were augmented to encompass the enhancement of the existing ERP system’s functionalities. Additionally, I was commissioned to architect an E-commerce system, further broadening the scope of my professional expertise. This project underscored my ability to adapt to new visions and deliver innovative solutions.
                    </div>
                </div>
            </div>
        </div>
    `);
}