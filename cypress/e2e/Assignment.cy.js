/// <reference types="Cypress" />

//Testing login scenarios using cypress

describe('Login Page Test Scenarios', () => {

    beforeEach('Visit Demo URL',()=>{
        cy.visit('https://sakshingp.github.io/assignment/login.html');
        
    })
    
        //log in with a valid username and password
    it('Positive Scenario-Valid Username and Password',()=>{ 

        cy.get('.auth-header').should('contain','Login Form');
        
        cy.get('#username').type('abc');

        
        cy.get('#password').type('abc');

        
        cy.get("input[type='checkbox']").check().should('be.checked');
        
        cy.get('#log-in').click();
        
        cy.url().should('eq', "https://sakshingp.github.io/assignment/home.html");

    })
      
      //log in with valid username and invalid password

    it('Negative Scenario-Valid Username Invalid Password',()=>{

        cy.get('#username').type('abc');

        cy.get('#password');

        
        cy.get("input[type='checkbox']").check().should('be.checked');
        
        cy.get('#log-in').click();
        
        cy.get("div[class='alert alert-warning']").should('have.text', 'Password must be present');

    })
    


       //log in with invalid username and valid password
    it('Negative Scenario-Invalid Username Valid Password',()=>{

        cy.get('#username');

        cy.get('#password').type(123);

        
        cy.get("input[type='checkbox']").check();
        
        cy.get('#log-in').click();
        
        cy.get(".alert.alert-warning").should('have.text', 'Username must be present')

        
    })
    
    //log in with invalid username and invalid password

    it('Negative Scenario-Invalid Username and Password',()=>{

        cy.get('#username');

        cy.get('#password');

        cy.get("input[type='checkbox']").check();
        
        cy.get('#log-in').click();
        

       cy.get("div[class='alert alert-warning']")
       .should('contain','Both Username and Password must be present');


    })


     //log in with special characters

     it('Log in using special characters',()=>{

        cy.get('#username').type("$");

        cy.get('#password').type(".");

        cy.get("input[type='checkbox']").check();
        
        cy.get('#log-in').click();
        
        cy.url().should('eq', "https://sakshingp.github.io/assignment/home.html");


    })


    //log in with negative values

    it('Log in using negative integers',()=>{

        cy.get('#username').type("-123");

        cy.get('#password').type("-25");

        cy.get("input[type='checkbox']").check();
        
        cy.get('#log-in').click();
        
        cy.url().should('eq', "https://sakshingp.github.io/assignment/home.html");


    })


     //Verifying placeholders

    it('Verifying placeholders', ()=>{

    cy.get("input[placeholder='Enter your username']")
    .should('have.attr', 'placeholder', 'Enter your username');

    cy.get("input[placeholder='Enter your password']")
    .should('have.attr', 'placeholder', 'Enter your password');
          
     })
    

     //Logging in with enter key
    
     it('Verify Log in using Enter key',()=>{  

    cy.get('.auth-header').should('contain','Login Form');
    
    cy.get('#username').type('abc');

    cy.get('#password').type('abc');

    cy.get("input[type='checkbox']").check().should('be.checked');
    
    cy.get('#log-in').type('{enter}');
    
    cy.url().should('eq', "https://sakshingp.github.io/assignment/home.html");

     })


     //Checking visiblity of social media icons

     it('Verify visibilty of social media icons',()=>{

    cy.get("img[src='img/twitter.png']").should('be.visible');
    cy.get("img[src='img/facebook.png']").should('be.visible');
    cy.get("img[src='img/linkedin.png']").should('be.visible');

     })

    
})


     //Home Page - Check Amount is sorted

describe('Home Page Validation', () => {


    it('Verify amounts is sorted ',()=>{
    
        cy.visit('https://sakshingp.github.io/assignment/login.html');
    
        cy.get('.auth-header').should('contain','Login Form')
            
        cy.get('#username').type('123');
    
        cy.get('#password').type('abc');
    
        cy.get("input[type='checkbox']").check().should('be.checked');
        
        cy.get('#log-in').click();
        
        cy.url().should('eq', "https://sakshingp.github.io/assignment/home.html");
    
        cy.get('#amount').click();
    
        cy.get("tbody td:nth-child(5)").should('have.length',6)


        var previousValue;
        cy.get("tbody td:nth-child(5) span").each(($el,index, $list)=>{
            
            let actualText=$el.text()

             let value=actualText.replace(/[^\d\.\-]/g, "");

            let currentValue=parseFloat(value)

            {if (index > 0) {
                
            expect(previousValue).to.be.lessThan(currentValue) } ;

             previousValue = currentValue;}

         })
    })
})