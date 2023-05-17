import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: {
        projectId: 'foodies-firebase-20f8c',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDt+2XCEIBizWqf\n6uK72kzyCbumMd1mI48WSlgxgYwc+KVnIA4qbKoHxtQ2NaVFdT7KsF9HpWN5X0E9\nrm9Wnrrj0wGgtL6YsuNiA8lHViLnvGlHjHRIPsDS2N0ZxlaKMwJcKOPVuTzM2WmO\nTeFZymSiF5+hce4ArpXWYXdHWCFj20IHjTz8amXo9VU9l2CiJYyhnL9Xr4nplto1\nyg1Ofu4GfnA3gm65hppFw/sY6opaEe8uoXODBaDkHyerUEekZnWiCFbUKAQp2fI3\nDybnK560t14oHJpYvhPKfqDp/gHpWcJRldPv2sn1UKWuve/pMOK0T9jnm1eUnecf\n3Euo0m97AgMBAAECggEAJwLhgkerNscT9fq5R/BipwCXyAgqPMk9IPsh7EefZ3Zj\nwtJwkAgicpuSLlVqmMa9+thLs4Egm9pUuwmXtcbXvcCuu8s1PUSB3WTf1LesNCRg\ny7pHVjp3Pc5lUYl/poWdxZbBtnIi+IpL8T3CCwflqY6e0TEjF0Mx9nkhZkrDpSG7\nXX8NdXkgQsiaBuPXqsgiitac7/WLYHgIoh+iJAIjRw396xQPsDcYlfYZkYabQafv\nzjg+L7RU1Mk+lmDUAnJ4asGjUVnMCPiNYIpit98W2A5vhu1vDg0j7Wb1UrphPrgm\nepbQRu+VJWv/Q2xTk+8tAcMq3x9CzJR+XDHOVyLq5QKBgQD7ZsqEH2aZtPw5YSny\nLNSU6kXYli8EMFTkHOkNgl9rteflkTAyY3m0MqilBQWhU/gUyEdCC3vfEkONaVUF\nu/2OHlBGNO3oTSlrvbiXG03Dvln1FSbD8m8vnOPJNcZoR8iLSqKSM3Gy7ds9y7N9\nJv81EQwCM3zF67Jhy1eig/pkrQKBgQDyVcS4ioEqOQ9Vf/c50h+ZElPB3+iNXVK6\nBCxJ9UTxFGzRRwh6b6Xh4Bied6+wbWxfzKEvs2yX6doXqdSpNFRsKWjMtJEy8Cnu\nI+iUjFClmgAnPM4dZA9Cm55cJk1XQbuqbgQaaXoGyhx0jtOeE9/JeLvc2DejmlyE\nEA6lcZ+BxwKBgE/1RXv4ML26Xm4xhRHNSF+Ek2predCvPpC+0TDGwmqTlInjP50H\nHnI9mn3BtyS0fDa/7EoJNQCh4nJbifsk62QEKCvsMa6su/vUf50vxe/33sygSZAQ\nz2QpVhlszQnlqtcCiepOCl+KXyysWQ35FTpfjZ41mf2pFTcdYWYC6+SRAoGBAIbW\nBCQuJJpKr2aCUhvg92XjVaktHabygyIvSjlIeDivhbCYFnaRgroAR5J8w8ulxsQz\nBoiVC9om6wt5mnMfQ83+6GnmGlg+WwY/Ap0MyZ6q5mTupzyhPQBxuBZL1YK0d2fn\n2O6dO6FleZm9ErAFHOJsBBNoVuT38XwltxCE/RxnAoGBAJqU6a/b8VCQ5FKzrBjp\nc9QQzL3JswZXOBldmGqdZsGusUsNi5zsUv5HP/HKFf5PDCVXsuzJ3Tc/UyfgfIBw\npNlrxEdCpkkHRFiWAcek6sGA/mpkS3COHtFYdnULFsBHRkidDs14Jsc3D/MyMIwx\nh6dyEEerljjtaCUpRFeUYUmh\n-----END PRIVATE KEY-----\n',
        clientEmail:
          'firebase-adminsdk-gytta@foodies-firebase-20f8c.iam.gserviceaccount.com',
      },
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
